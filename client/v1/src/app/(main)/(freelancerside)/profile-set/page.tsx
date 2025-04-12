"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const ProfileSetPage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagPrices, setTagPrices] = useState<{ [key: string]: number }>({});
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState<number | "">("");

  const tagOptions = [
    "Web Development",
    "Graphic Design",
    "Blockchain",
    "Content Writing",
    "SEO",
    "Video Editing",
    "Music Production",
    "Marketing",
  ];

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      const updatedPrices = { ...tagPrices };
      delete updatedPrices[tag];
      setTagPrices(updatedPrices);
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePriceChange = (tag: string, price: number) => {
    setTagPrices({ ...tagPrices, [tag]: price });
  };

  const handleSubmit = async () => {
    if (selectedTags.length < 1) {
      alert("Please select at least one tag.");
      return;
    }
    if (Object.values(tagPrices).some((price) => price <= 0)) {
      alert("Please set a valid price for each selected tag.");
      return;
    }
    if (!description.trim()) {
      alert("Please provide a description.");
      return;
    }
    if (!experience || experience <= 0) {
      alert("Please provide a valid experience in months.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authorization token is missing.");
      return;
    }

    const freelancerDetails = {
      tags: selectedTags.map((tag) => ({
        tagName: tag,
        HourlyRate: tagPrices[tag],
      })),
      description,
      experience: Number(experience),
    };

    try {
      const response = await fetch("http://localhost:8080/user/recruiter/freelancer/addDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(freelancerDetails),
      });

      if (response.ok) {
        alert("Profile submitted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit profile: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("An error occurred while submitting the profile.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-zinc-800 border border-zinc-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Set Up Your Freelancer Profile
        </h1>
        <p className="text-zinc-400 mb-4 text-center">
          Select 1 to 3 tags that best describe your skills:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {tagOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-emerald-500 text-black border-emerald-500"
                  : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {selectedTags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Set Max Price for Each Tag</h2>
            {selectedTags.map((tag) => (
              <div key={tag} className="flex items-center gap-4 mb-4">
                <span className="w-1/3">{tag}</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={tagPrices[tag] || ""}
                  onChange={(e) =>
                    handlePriceChange(tag, parseFloat(e.target.value) || 0)
                  }
                  className="w-2/3 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Freelancer Description</h2>
          <textarea
            placeholder="Describe yourself and your skills..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Experience (in months)</h2>
          <input
            type="number"
            placeholder="Enter your experience in months"
            value={experience}
            onChange={(e) => setExperience(parseInt(e.target.value) || "")}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 w-full"
        >
          Submit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetPage;
