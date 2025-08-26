import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createClient } from '@supabase/supabase-js';

// Load from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const UploadImage = ({ onImageUrlChange, bucket = 'InventoryImages', folder = 'user-uploads' }) => {
  const [uploading, setUploading] = useState(false);

  const uploadToSupabase = async (file) => {
    try {
      setUploading(true);

      const ext = file.name?.split('.').pop() || 'png';
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const path = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          contentType: file.type || 'application/octet-stream',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (!publicUrl) {
        throw new Error('Unable to get public URL for the uploaded file');
      }

      onImageUrlChange?.(publicUrl);
      message.success('Image uploaded successfully');
      localStorage.setItem('image', publicUrl);
      return publicUrl;
    } catch (err) {
      const msg = err?.message || 'Upload failed';
      message.error(msg);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = async (file) => {
    // Basic validation
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files');
      return Upload.LIST_IGNORE;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB');
      return Upload.LIST_IGNORE;
    }

    try {
      await uploadToSupabase(file);
    } catch {
      // already handled
    }
    // Prevent antd from auto-uploading since we handle it ourselves
    return false;
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      showUploadList={false}
      accept="image/*"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />} loading={uploading}>
        Upload Image
      </Button>
    </Upload>
  );
};

export default UploadImage;