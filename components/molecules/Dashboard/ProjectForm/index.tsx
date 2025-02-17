"use client";
import { Icons } from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { PacmanLoader } from "react-spinners";
import { DropzoneOptions } from "react-dropzone";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extension/file-uploader";
import Image from "next/image";
import addProjectApi from "@/utils/api/addProjectApi";
import updateProjectApi from "@/utils/api/updateProjectApi";
import { ICategory } from "@/interfaces";
import { useRouter } from "next/navigation";
import OldImages from "@/components/atoms/OldImages";

export type OldImageRefType = {
  handleOldImageDelete: (imagePath: string, deleteId: string) => void;
};

const createFormSchema = (mode: string = "") => {
  return z.object({
    title: z.string().min(1, "Title is required"),
    description: z
      .string()
      .min(10, "Description required minumum 10 characters")
      .max(1000, "Maximum description is 500 characters"),
    category: z.number().min(1, "Category is required"),
    tag: z.union([z.string(), z.array(z.string())]),
    url_path: z.string().url(),
    files: z
      .array(
        z
          .any()
          .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
          .refine(
            (file) =>
              ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                file?.type
              ),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
          )
      )
      .min(mode === "edit" ? 0 : 1, "Image is required")
      .max(4, "Maximum image is 4"),
  });
};

const ProjectForm = ({ mode, data }: { mode?: string; data?: any }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(
    data?.tag.split(",").map((item: string) => item.trim()) || []
  );
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState<File[] | null>([]);
  const [oldImages, setOldImages] = useState<string[]>([]);
  const [deletedImagePath, setDeletedImagePath] = useState<string[]>([]);
  const [deletedImageId, setDeletedImageId] = useState<string[]>([]);

  const oldImageRef = useRef<OldImageRefType>(null);

  // console.log(deletedImagePath, deletedImageId);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 100,
    maxSize: 3 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const formSchema = createFormSchema(mode);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      category: data?.category || 0,
      tag: data?.tag.split(",").map((item: string) => item.trim()) || "",
      url_path: data?.url_path || "",
      files: [],
    },
  });

  const {
    isLoading: loadCategory,
    error: errCategory,
    data: category,
  } = useFetchProjects({
    path: "/categories",
    query: "categoryListAddProject",
  });

  const handleAddTag = (field: any) => {
    if (inputValue.trim()) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue(""); // Clear the input value
      field.onChange(newTags.join(",")); // Update the form field with a comma-separated string
    }
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === " ") {
      e.preventDefault();
      if (inputValue.trim()) {
        setTags([...tags, inputValue.trim()]);
        setInputValue(""); // Clear the input value
        field.onChange([...tags, inputValue.trim()]); // Update the form field value
      }
    } else if (e.key === "Backspace" && !inputValue) {
      e.preventDefault();
      if (tags.length > 0) {
        const newTags = tags.slice(0, -1); // Remove the last tag
        setTags(newTags);
        field.onChange(newTags); // Update the form field value
      }
    }
  };

  const handleInputTagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    setInputValue(e.target.value);
    field.onChange(tags); // Keep the form field value in sync with tags
  };

  const handleOldImageDelete = (imagePath: string, deleteId: string) => {
    setDeletedImagePath((prev) => [...prev, imagePath]);
    setDeletedImageId((prev) => [...prev, deleteId]);
  };

  useEffect(() => {
    const oldImagesArr = data?.image_path.split(",");
    setOldImages(oldImagesArr);
  }, [data]);

  useEffect(() => {
    const oldImagesArr = data?.image_path.split(",");
    setOldImages(
      oldImagesArr?.filter(
        (image: string) => image && !deletedImagePath.includes(image)
      )
    );
  }, [deletedImagePath, data]);

  async function onSubmit(projectData: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // console.log(projectData);

    const formData = new FormData();
    // Append the non-file fields
    formData.append("title", projectData.title);
    formData.append("description", projectData.description);
    formData.append("category", String(projectData.category));
    formData.append("tag", projectData.tag.toString());
    formData.append("url_path", projectData.url_path);

    for (let i = 0; i < projectData.files.length; i++) {
      formData.append("files", projectData.files[i]);
    }

    if (mode == "edit") {
      formData.append("image_path", data.image_path);
      formData.append("image_delete_id", data.image_delete_id);
      formData.append("deleted_image_path", deletedImagePath.join(","));
      formData.append("in_image_delete_id", deletedImageId.join(","));
    }

    // console.log(...formData);

    try {
      let response;
      if (mode == "edit") {
        response = await updateProjectApi(formData, data?.id);
      } else {
        response = await addProjectApi(formData);
      }
      if (response) {
        // window.location.replace("/dashboard/project");
        router.push("/dashboard/project");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Some catchy name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="type something that explain your catchy project"
                    className="h-28"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? category?.find(
                              (category: ICategory) =>
                                category.id === field.value
                            )?.name
                          : "Select category..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fulll p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          {loadCategory ? (
                            <CommandEmpty>
                              <PacmanLoader size={10} />
                            </CommandEmpty>
                          ) : (
                            <>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {category.map((category: ICategory) => (
                                  <CommandItem
                                    key={category.name + category.id}
                                    value={category.id as unknown as string}
                                    onSelect={() => {
                                      field.onChange(
                                        category.id === field.value
                                          ? 0
                                          : category.id
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === category.id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {category.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <div
                    className="flex flex-wrap items-center gap-1 px-4 py-2 border rounded-md text-sm placeholder:text-muted-foreground"
                    onClick={() =>
                      document.getElementById("tag-input")?.focus()
                    }
                  >
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    <input
                      id="tag-input"
                      placeholder="Keyword for this project"
                      value={inputValue}
                      onChange={(e) => handleInputTagChange(e, field)}
                      onKeyDown={(e) => handleTagKeyDown(e, field)}
                      onBlur={() => handleAddTag(field)}
                      className="flex-grow border-none outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url_path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Where to see your beautiful project"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Files</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={(e) => {
                      setFiles(e);
                      field.onChange(e);
                    }}
                    dropzoneOptions={dropzone}
                  >
                    <FileInput>
                      <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
                        <p className="text-gray-400">Drop files here</p>
                      </div>
                    </FileInput>
                    <FileUploaderContent
                      className={`flex items-center flex-row gap-2 ${
                        files?.length == 0 && "mt-2"
                      }`}
                    >
                      {/* if the user update item, it will appear old images */}
                      {mode == "edit" &&
                        (() => {
                          const deletedImagesArray =
                            data.image_delete_id.split(",");

                          return oldImages.map(
                            (filePath: string, i: number) => (
                              <OldImages
                                key={i}
                                index={i}
                                className="size-20 p-0 rounded-md overflow-hidden"
                                aria-roledescription={`Image ${i + 1}`}
                                filePath={filePath}
                                deleteImageId={deletedImagesArray[i]}
                                ref={oldImageRef}
                                onDelete={handleOldImageDelete}
                              >
                                <Image
                                  src={filePath}
                                  alt={`Image ${i + 1}`}
                                  height={80}
                                  width={80}
                                  className="size-20 p-0"
                                />
                              </OldImages>
                            )
                          );
                        })()}
                      {files?.map((file, i) => (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          className="size-20 p-0 rounded-md overflow-hidden"
                          aria-roledescription={`file ${i + 1} containing ${
                            file.name
                          }`}
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            height={80}
                            width={80}
                            className="size-20 p-0"
                          />
                        </FileUploaderItem>
                      ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
                {mode == "edit" && (
                  <p className="text-xs text-gray-400 max-md:text-center">
                    Upload new images if you wanna change old one
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
