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
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
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

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, "Description required minumum 10 characters")
    .max(500, "Maximum description is 500 characters"),
  category: z.number().min(1, "Category is required"),
  tag: z.union([z.string(), z.array(z.string())]),
  url_path: z.string().url(),
  files: z.array(z.any()).min(1, "Images is required"),
});

const ProjectForm = ({ mode, data }: { mode?: string; data?: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState<File[] | null>([]);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 100,
    maxSize: 3 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: 0,
      tag: "",
      url_path: "",
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

  const handleAddTag = (field) => {
    if (inputValue.trim()) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue(""); // Clear the input value
      field.onChange(newTags.join(",")); // Update the form field with a comma-separated string
    }
  };

  const handleTagKeyDown = (e, field) => {
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

  const handleInputTagChange = (e, field) => {
    setInputValue(e.target.value);
    field.onChange(tags); // Keep the form field value in sync with tags
  };

  async function onSubmit(projectData: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // console.log(projectData);

    const formData = new FormData();
    // Append the non-file fields
    formData.append("title", projectData.title);
    formData.append("description", projectData.description);
    formData.append("category", String(projectData.category));
    formData.append("tag", projectData.tag);
    formData.append("url_path", projectData.url_path);

    for (let i = 0; i < projectData.files.length; i++) {
      formData.append("files", projectData.files[i]);
    }

    // console.log(...formData);

    try {
      const response = await addProjectApi(formData);
      if (response) {
        window.location.replace("/dashboard/project");
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
                    className="h-15"
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
                          ? category.find(
                              (category: any) => category.id === field.value
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
                                {category.map((category: any) => (
                                  <CommandItem
                                    key={category.name + category.id}
                                    value={category.id}
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
                    onClick={() => document.getElementById("tag-input").focus()}
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
                      console.log(e);
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
                    <FileUploaderContent className="flex items-center flex-row gap-2">
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
