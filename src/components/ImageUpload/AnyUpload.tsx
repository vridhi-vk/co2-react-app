import { co2 } from "@tgwf/co2";
import React, { useState } from "react";

const AnyUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [emissions, setEmissions] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] ?? null;
    setFile(uploadedFile);

    if (uploadedFile) {
      console.log(uploadedFile, "uploadedFile");
      const imageSizeInBytes = uploadedFile.size; // size in bytes
      console.log(`File size: ${imageSizeInBytes} bytes`);

      const co2Estimator = new co2();

      // Estimate emissions
      const calculatedEmissions = co2Estimator.perByte(imageSizeInBytes);

      console.log(
        `Estimated CO2 emissions for uploading the image: ${calculatedEmissions} grams`
      );
      setEmissions(calculatedEmissions);
      const url = URL.createObjectURL(uploadedFile);
      setImageUrl(url);
    } else {
      setImageUrl(null);
      setEmissions(0);
      setFile(null);
    }
  };

  return (
    <div className="image-upload-container">
      <h1 className="upload-title">UPLOAD IMAGE 1</h1>
      <h4>Suggestion: Upload a TIFF/ BMP/ PNG image file</h4>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ margin: "20px", maxWidth: "30%", height: "auto" }}
        />
      )}
      {file && (
        <div className="file-details">
          <p>File Name: {file.name}</p>
          <p>File Type: {file.type}</p>
          <p>File Size: {file.size} bytes</p>
          <p>CO2 Emissions: {emissions} grams</p>
        </div>
      )}
    </div>
  );
};
export default AnyUpload;
