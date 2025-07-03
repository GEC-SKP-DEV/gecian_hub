'use client';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function ComplaintForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !place.trim() || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    let imageUrl = null;
    try {
      imageUrl = await toBase64(image);
    } catch (err) {
      console.error('Error converting image:', err);
      alert('Failed to convert image.');
      return;
    }

    // ⛔ Don't actually send to API now
    const formData = { title, description, place, imageUrl };
    console.log('📝 Collected Complaint Data:', formData);

    alert('Form submitted (not sent to backend). Check console for data.');
    
    // Reset fields (optional)
    setTitle('');
    setDescription('');
    setPlace('');
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
      <div className="border rounded-lg p-4 text-center bg-gray-100">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mx-auto w-full max-w-xs h-40 object-cover rounded mb-2"
          />
        )}
        <label className="cursor-pointer underline text-gray-700">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Title Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <label htmlFor="place">Place</label>
      <input
        id="place"
        type="text"
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Confirm
      </button>
    </form>
  );
}