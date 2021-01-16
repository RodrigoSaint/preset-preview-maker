import { FaDownload } from "react-icons/fa";
import html2canvas from "html2canvas";

import Layout from "component/common/Layout";
import { useCallback, useState } from "react";

interface PresetPreviewMakerProp {
  beforeImage: string;
  afterImage: string;
  presetName: string;
  top?: string;
  right?: string;
}

function PresetPreviewMaker({
  beforeImage,
  afterImage,
  presetName,
  top,
  right,
}: PresetPreviewMakerProp) {
  const onSave = useCallback(() => {
    html2canvas(document.getElementById("preview")).then((canvas) => {
      const link = document.createElement("a");

      link.href = canvas.toDataURL();
      link.download = `${presetName}.png`;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    });
  }, [presetName]);
  return (
    <>
      <button
        className="flex align-middle bg-green-500 py-2 px-4 rounded-lg text-white m-2"
        onClick={onSave}
      >
        <FaDownload className="mr-2 mt-1" /> Save Image
      </button>
      <div id="preview" className="flex flex-wrap">
        <div className="flex-grow w-6/12 relative">
          <span
            className={`absolute top-${top || 10} right-${
              right || 10
            } z-10 text-white font-bold text-4xl py-1 px-4 rounded-2xl`}
            style={{ backgroundColor: "rgba(0,0,0, 0.6)" }}
          >
            Before
          </span>
          <img src={beforeImage} />
        </div>
        <div className="flex-grow w-6/12 relative">
          <span
            className={`absolute top-${top || 10} right-${
              right || 10
            } z-10 text-white font-bold text-4xl py-1 px-4 rounded-2xl`}
            style={{ backgroundColor: "rgba(0,0,0, 0.6)" }}
          >
            After
          </span>
          <span
            className={`absolute bottom-${top || 10} right-${
              right || 10
            } z-10 text-white font-bold text-4xl py-1 px-4 rounded-2xl`}
            style={{ backgroundColor: "rgba(0,0,0, 0.6)" }}
          >
            {presetName}
          </span>
          <img src={afterImage} />
        </div>
      </div>
    </>
  );
}

function previewFile(setImage, event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      setImage(reader.result);
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function Field({ name, children }) {
  return (
    <div className="flex flex-col">
      <label className="font-bold">{name}</label>
      {children}
    </div>
  );
}

const PaddingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24];

function PresetPreview() {
  const [name, setName] = useState("");
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [top, setTop] = useState("10");
  const [right, setRight] = useState("10");

  const setBeforeImage = useCallback(
    (event) => previewFile(setBefore, event),
    []
  );

  const setAfterImage = useCallback(
    (event) => previewFile(setAfter, event),
    []
  );

  return (
    <div>
      <div className="flex space-x-4 items-center mx-2 mb-10">
        <Field name="Preset Name">
          <input
            autoFocus
            className="border-blue-600 border-2 p-1 rounded-lg top"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>
        <Field name="Before">
          <input type="file" onChange={setBeforeImage} />
        </Field>
        <Field name="After">
          <input type="file" onChange={setAfterImage} />
        </Field>
        <Field name="Top">
          <select value={top} onChange={(event) => setTop(event.target.value)}>
            {PaddingOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field name="Right">
          <select
            value={right}
            onChange={(event) => setRight(event.target.value)}
          >
            {PaddingOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
      </div>
      {name && before && after && (
        <PresetPreviewMaker
          beforeImage={before}
          afterImage={after}
          presetName={name}
          top={top}
          right={right}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Preset Preview Maker"
      description="A nice Preset Preview Maker"
    >
      <PresetPreview />
    </Layout>
  );
}
