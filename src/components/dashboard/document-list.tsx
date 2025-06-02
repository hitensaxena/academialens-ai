'use client';

import { FileText, Download, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt';
  size: number;
  uploadedAt: Date;
  status: 'processing' | 'processed' | 'error';
  thumbnail?: string;
}

interface DocumentListProps {
  documents: Document[];
  onView?: (doc: Document) => void;
  onDownload?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
  className?: string;
}

export function DocumentList({
  documents,
  onView,
  onDownload,
  onDelete,
  className,
}: DocumentListProps) {
  const { toast } = useToast();

  const handleAction = (doc: Document, action: 'view' | 'download' | 'delete') => {
    try {
      switch (action) {
        case 'view':
          onView?.(doc);
          break;
        case 'download':
          onDownload?.(doc);
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete "${doc.name}"?`)) {
            onDelete?.(doc);
          }
          break;
      }
    } catch (error) {
      console.error(`Failed to ${action} document:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${action} document. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  if (documents.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
        <FileText className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No documents yet</h3>
        <p className="text-sm text-gray-500">
          Upload your first document to get started with your research.
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Uploaded
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 rounded-md">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {doc.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {doc.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(doc, 'view')}
                      disabled={doc.status !== 'processed'}
                      title={doc.status === 'processed' ? 'View' : 'Processing...'}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(doc, 'download')}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(doc, 'delete')}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Document['status'] }) {
  const statusConfig = {
    processing: {
      text: 'Processing',
      className: 'bg-yellow-100 text-yellow-800',
    },
    processed: {
      text: 'Ready',
      className: 'bg-green-100 text-green-800',
    },
    error: {
      text: 'Error',
      className: 'bg-red-100 text-red-800',
    },
  };

  const config = statusConfig[status] || statusConfig.error;

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.className}`}
    >
      {config.text}
    </span>
  );
}
