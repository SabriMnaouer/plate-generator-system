import React, { useRef } from 'react';
// @ts-ignore
import { Button } from '@/components/ui/button';
// @ts-ignore
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';

interface ImportExportControlsProps {
    onImageUpload: (imageUrl: string) => void;
    onExportCanvas: () => void;
    className?: string;
}

export const ImportExportControls: React.FC<ImportExportControlsProps> = ({
    onImageUpload,
    onExportCanvas,
    className = '',
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    onImageUpload(result);
                }
            };
            reader.readAsDataURL(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Import/Export
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button
                    onClick={handleUploadClick}
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                >
                    <Upload className="h-4 w-4 mr-2" />
                    Motif hochladen
                </Button>

                <Button
                    onClick={onExportCanvas}
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                >
                    <Download className="h-4 w-4 mr-2" />
                    Als PNG exportieren
                </Button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </CardContent>
        </Card>
    );
};
