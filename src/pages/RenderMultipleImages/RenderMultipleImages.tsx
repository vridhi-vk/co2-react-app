import React, { useEffect, useState } from "react";
import { co2 } from "@tgwf/co2";

interface ImageData {
  name: string;
  url: string;
  size: number;
}

interface Emissions {
  jpg: number;
  webp: number;
}

const RenderMultipleImages: React.FC = () => {
  const [jpgImages, setJpgImages] = useState<ImageData[]>([]);
  const [webpImages, setWebpImages] = useState<ImageData[]>([]);
  const [emissions, setEmissions] = useState<Emissions>({ jpg: 0, webp: 0 });
  const [sizes, setSizes] = useState<{ jpg: number; webp: number }>({
    jpg: 0,
    webp: 0,
  });
  const [reduction, setReduction] = useState<number>(0);

  const co2Estimator = new co2();

  function calculatePercentageReduction(
    oldValue: number,
    newValue: number
  ): number {
    return ((oldValue - newValue) / oldValue) * 100;
  }

  useEffect(() => {
    const reduction = calculatePercentageReduction(
      emissions.jpg,
      emissions.webp
    );
    console.log(
      `The percentage reduction in carbon emissions is ${reduction.toFixed(2)}%`
    );
    setReduction(reduction);
  }, [emissions]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const jpg: ImageData[] = [];
    const webp: ImageData[] = [];
    let jpgCO2 = 0;
    let webpCO2 = 0;

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const size = file.size;
      const emission = co2Estimator.perByte(size);

      const imageData: ImageData = {
        name: file.name,
        url,
        size,
      };

      if (
        file.name.endsWith(".jpg") ||
        file.name.endsWith(".png") ||
        file.name.endsWith(".svg")
      ) {
        jpg.push(imageData);
        jpgCO2 += emission;
      } else if (file.name.endsWith(".webp")) {
        webp.push(imageData);
        webpCO2 += emission;
      }
    });

    setJpgImages(jpg);
    setWebpImages(webp);
    setEmissions({ jpg: jpgCO2, webp: webpCO2 });
    setSizes({
      jpg: jpg.reduce((acc, img) => acc + img.size, 0),
      webp: webp.reduce((acc, img) => acc + img.size, 0),
    });
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input
        type="file"
        multiple
        accept=".jpg,.png,.webp, .svg"
        onChange={handleUpload}
      />

      <div
        style={{
          display: "flex",
          marginTop: "20px",
          borderRight: "1px solid black",
        }}
      >
        <div style={{ flex: 1, padding: "10px" }}>
          <h3>JPG Images</h3>
          {jpgImages.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.name}
              style={{ width: "50%", marginBottom: "10px" }}
            />
          ))}
          <p>JPEG/PNG Images</p>
          <p>
            <strong>Estimated CO₂: </strong>
            {emissions.jpg.toFixed(6)} grams
          </p>
          <p>
            <strong>Total size (bytes): </strong>
            {sizes.jpg} bytes
          </p>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <h3>WEBP Images</h3>
          {webpImages.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.name}
              style={{ width: "50%", marginBottom: "10px" }}
            />
          ))}
          <p>WEBP Images</p>
          <p>
            <strong>Estimated CO₂: </strong>
            {emissions.webp.toFixed(6)} grams
          </p>
          <p>
            <strong>Total size (bytes): </strong>
            {sizes.webp} bytes
          </p>
        </div>
      </div>
      <div>
        <p>
          {`The percentage reduction in carbon emissions is:
          ${reduction ? reduction.toFixed(2) : "0"}%`}
        </p>
      </div>
    </div>
  );
};

export default RenderMultipleImages;
