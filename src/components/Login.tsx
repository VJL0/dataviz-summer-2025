import { useState, useEffect } from "react";

type Status = {
  message: string;
  isError: boolean;
} | null;

const Login: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    chrome.storage.local.get(["userId", "userName"], (items) => {
      setId(items.userId || "");
      setName(items.userName || "");
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    chrome.storage.local.get(["userId", "userName"], (items) => {
      if (items.userId == id && items.userName == name) {
        setStatus({
          message: "You already have these credentials saved.",
          isError: true,
        });
        return;
      }

      if (!id.trim()) {
        setStatus({ message: "ID is required", isError: true });
        return;
      }

      chrome.storage.local.set(
        { userId: id.trim(), userName: name.trim() },
        () => {
          setStatus({ message: "Saved successfully!", isError: false });
        },
      );
    });
  };

  const handleClear = () => {
    chrome.storage.local.remove(["userId", "userName"], () => {
      setId("");
      setName("");
      setStatus(null);
    });
  };

  return (
    <div className="relative right-2 flex w-80 flex-col justify-center rounded-2xl border bg-white p-6">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        Survey Login
      </h2>

      <div className="my-3 h-4">
        {status && (
          <p
            className={`text-sm ${status.isError ? "text-red-500" : "text-green-500"}`}
          >
            {status.message}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        onChange={() => setStatus(null)}
        className="space-y-6"
      >
        {/* Name Optional */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Name (optional)
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        {/* ID Required */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            ID <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter your ID"
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        {/* Submit & Clear Buttons */}
        <div className="space-y-3">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm/6 font-medium text-gray-700 shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Clear Credentials
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
