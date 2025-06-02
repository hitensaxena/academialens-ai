'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';

interface DocumentUploadProps {
  onUploadComplete?: (files: File[]) => void;
  className?: string;
}

export function DocumentUpload({ onUploadComplete, className }: DocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter for PDF and DOCX files
      const validFiles = acceptedFiles.filter(
        (file) =>
          file.type === 'application/pdf' ||
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );

      if (validFiles.length !== acceptedFiles.length) {
        toast({
          title: 'Invalid file type',
          description: 'Only PDF and DOCX files are supported.',
          variant: 'destructive',
        });
      }

      setFiles((prev) => [...prev, ...validFiles]);
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 5,
    disabled: isUploading,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      // TODO: Implement actual file upload
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: 'Upload successful',
        description: `${files.length} file(s) have been uploaded.`,
      });

      onUploadComplete?.(files);
      setFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your files. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400',
          isUploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop files here, or click to select files'}
          </p>
          <p className="text-xs text-gray-500">Supported formats: PDF, DOCX (max 5 files)</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium">Files to upload ({files.length})</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <File className="h-4 w-4 text-gray-500" />
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-red-500"
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading || files.length === 0}
              className="w-full sm:w-auto"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                `Upload ${files.length} file${files.length !== 1 ? 's' : ''}`
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function cn(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
