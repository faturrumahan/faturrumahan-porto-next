import { OldImageRefType } from "@/components/molecules/Dashboard/ProjectForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 as RemoveIcon } from "lucide-react";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

const OldImages = forwardRef<
  OldImageRefType,
  {
    index: number;
    filePath: string;
    deleteImageId: string;
    onDelete: (imagePath: string, deleteId: string) => void;
  } & React.HTMLAttributes<HTMLDivElement>
>(
  (
    { className, index, filePath, deleteImageId, onDelete, children, ...props },
    ref
  ) => {
    const divRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
      handleOldImageDelete: (imagePath: string, deleteId: string) => {
        onDelete(imagePath, deleteId);
      },
    }));
    return (
      <div
        ref={divRef}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-6 p-1 justify-between cursor-pointer relative",
          className
        )}
        {...props}
      >
        <div className="font-medium leading-none tracking-tight flex items-center gap-1.5 h-full w-full">
          {children}
        </div>
        <button
          type="button"
          className={cn("absolute top-1 right-1")}
          onClick={() => {
            if (ref && "current" in ref && ref.current) {
              ref.current.handleOldImageDelete(filePath, deleteImageId); // Trigger the delete
            }
          }}
        >
          <span className="sr-only">remove item {index}</span>
          <RemoveIcon className="w-4 h-4 hover:stroke-destructive duration-200 ease-in-out" />
        </button>
      </div>
    );
  }
);

OldImages.displayName = "OldImagesContent";

export default OldImages;
