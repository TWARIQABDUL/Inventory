import React, {useState} from 'react';
import {createClient} from '@supabase/supabase-js';
import {Upload, Button, message} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `user-uploads/${fileName}`;

      const {error: uploadError} = await supabase.storage
        .from('InventoryImages')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {data} = await supabase.storage
        .from('InventoryImages')
        .getPublicUrl(filePath);

      message.success('File uploaded successfully!');
      return data.publicUrl;
    } catch (err) {
      message.error(err.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const props = {
    beforeUpload: (file) => {
      uploadFile(file);
      return false;
    },
    maxCount: 1,
    accept: 'image/*'
  };

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined/>} loading={uploading}>
          Upload Image
        </Button>
      </Upload>
    </div>
  );
};

export default FileUpload;