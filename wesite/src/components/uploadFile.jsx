import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Load from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    if (event.target.files?.length > 0) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `user-uploads/${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('InventoryImages') // your Supabase bucket
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('InventoryImages')
        .getPublicUrl(filePath);

      alert('File uploaded successfully!');
      console.log('Public URL:', data.publicUrl);
    } catch (err) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload</h2>
      <input
        type="file"
        onChange={handleFileSelect}
        disabled={uploading}
        className="file-input"
      />
      {file && (
        <div className="file-details">
          <p>Selected file: {file.name}</p>
          <button
            onClick={uploadFile}
            disabled={uploading}
            className="upload-button"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      )}
      {error && (
        <div className="error-message" style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
