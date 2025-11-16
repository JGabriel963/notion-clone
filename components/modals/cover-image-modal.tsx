"use client";
import { SingleImageDropzone } from "@/components/upload/single-image";
import {
  UploaderProvider,
  useUploader,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();

  const onClose = () => coverImage.onClose();

  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();

      return res;
    },
    [edgestore]
  );

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-medium">Cover Image</h2>
        </DialogHeader>
        <div>
          <UploaderProvider uploadFn={uploadFn} autoUpload>
            <SingleImageDropzone
              height={200}
              width={200}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1, // 1 MB
              }}
            />
          </UploaderProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
