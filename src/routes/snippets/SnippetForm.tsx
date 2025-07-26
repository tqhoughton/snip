import feather from "feather-icons";
import { ValidationError } from "src/utils/errors";
import clsx from "clsx";

export interface Props {
  id?: string;
  initialValues?: {
    fullPath?: string;
    content?: string;
  };
  error?: ValidationError;
}

export const SnippetForm = ({ id, initialValues, error }: Props) => {
  const isFullPathError = error?.fields.find(
    (field) => field.name === "fullPath",
  );

  return (
    <form
      {...(id ? { "hx-put": `/snips/${id}` } : { "hx-post": "/snips" })}
      hx-target="main"
      class="space-y-4"
    >
      {error?.fields.map(({ error }) => (
        <div class="font-mono border-2 bg-red-400 text-black font-bold py-2 px-4 flex space-x-2 items-center">
          <span class="mt-0.5">{feather.icons["alert-octagon"].toSvg()}</span>
          <span>{error}</span>
        </div>
      ))}
      <div class="mb-4">
        <label>
          <span
            class={clsx(
              `text-2xl font-['VT323'] block mb-2`,
              isFullPathError && "text-red-400",
            )}
          >
            Path:
          </span>
          <input
            minlength={1}
            name="fullPath"
            type="text"
            class={clsx(
              `font-mono w-full p-2 bg-gray-800 text-green-400 placeholder-gray-600 border border-green-400 [&:user-invalid]:border-red-400 [&:user-invalid]:text-red-400`,
              isFullPathError && "border-red-400 text-red-400 border-2",
            )}
            placeholder="my/folder/my-snippet"
            value={initialValues?.fullPath}
          />
        </label>
      </div>
      <div class="mb-4">
        <label>
          <span class="text-2xl font-['VT323'] block mb-2">
            Content (markdown):
          </span>
          <textarea
            minlength={1}
            name="content"
            class="font-mono w-full p-2 bg-gray-800 text-green-400 placeholder-gray-600 border border-green-400 [&:user-invalid]:border-red-400"
            rows="16"
            placeholder="Enter snippet content"
          >
            {initialValues?.content}
          </textarea>
        </label>
      </div>
      <div class="flex space-x-4">
        <button
          type="submit"
          class="cursor-pointer text-xl font-mono bg-green-400 text-black font-bold py-2 px-4 hover:bg-black border-2 hover:text-blue-500 hover:border-blue-500 transition-all flex space-x-2"
        >
          <span class="mt-0.5">{feather.icons.save.toSvg()}</span>
          <span>{id ? "Update" : "Create"}</span>
        </button>
        {initialValues?.fullPath && (
          <a
            href={`/snips/${initialValues.fullPath}`}
            class="cursor-pointer text-xl font-mono bg-slate-400 text-black font-bold py-2 px-4 hover:bg-black border-2 hover:text-blue-500 hover:border-blue-500 transition-all flex space-x-2"
          >
            <span class="mt-0.5">{feather.icons.x.toSvg()}</span>
            <span>Cancel</span>
          </a>
        )}
      </div>
    </form>
  );
};
