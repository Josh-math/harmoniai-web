"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

type AnalyzeSongProps = {
  onBack: () => void;
};

export default function AnalyzeSong({ onBack }: AnalyzeSongProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [instrument, setInstrument] = useState("Keyboard");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [style, setStyle] = useState("Gospel");

  function chooseFile(file?: File) {
    if (!file) {
      return;
    }

    const supportedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/mp4",
      "audio/x-m4a",
    ];

    if (!supportedTypes.includes(file.type)) {
      alert("Please select an MP3, WAV, or M4A audio file.");
      return;
    }

    setSelectedFile(file);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    chooseFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    chooseFile(event.dataTransfer.files?.[0]);
  }

  function formatFileSize(bytes: number) {
    const megabytes = bytes / (1024 * 1024);
    return `${megabytes.toFixed(1)} MB`;
  }

  return (
    <div className="analyze-page">
      <button type="button" className="back-button" onClick={onBack}>
        ← Back to dashboard
      </button>

      <section className="analyze-heading">
        <p className="card-kicker">SONG INTELLIGENCE</p>
        <h2>Analyze your music</h2>
        <p>
          Upload a song and let Harmivo uncover its chords, tonal
          journey, modulations, performance paths, and enhancement
          opportunities.
        </p>
      </section>

      <div className="analyze-layout">
        <section className="upload-panel">
          <div
            className={
              isDragging
                ? "upload-zone upload-zone-dragging"
                : "upload-zone"
            }
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".mp3,.wav,.m4a,audio/*"
              hidden
              onChange={handleInputChange}
            />

            {!selectedFile ? (
              <>
                <span className="upload-icon">♫</span>
                <h3>Drop your song here</h3>
                <p>MP3, WAV, or M4A</p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => inputRef.current?.click()}
                >
                  Choose audio file
                </button>
              </>
            ) : (
              <div className="selected-file">
                <span className="selected-file-icon">♪</span>

                <div>
                  <strong>{selectedFile.name}</strong>
                  <small>{formatFileSize(selectedFile.size)}</small>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);

                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {selectedFile && (
            <audio
              className="audio-preview"
              controls
              src={URL.createObjectURL(selectedFile)}
            />
          )}
        </section>

        <aside className="analysis-settings">
          <div>
            <p className="card-kicker">YOUR PROFILE</p>
            <h3>Shape your results</h3>
            <p>
              Harmivo uses these choices to personalize its musical
              suggestions, not the objective song analysis.
            </p>
          </div>

          <label>
            Instrument
            <select
              value={instrument}
              onChange={(event) => setInstrument(event.target.value)}
            >
              <option>Keyboard</option>
              <option>Guitar</option>
            </select>
          </label>

          <label>
            Skill level
            <select
              value={skillLevel}
              onChange={(event) => setSkillLevel(event.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Professional</option>
            </select>
          </label>

          <label>
            Musical style
            <select
              value={style}
              onChange={(event) => setStyle(event.target.value)}
            >
              <option>Original</option>
              <option>Gospel</option>
              <option>Worship</option>
              <option>Jazz</option>
              <option>Neo Soul</option>
              <option>Pop</option>
            </select>
          </label>

          <button
            type="button"
            className="primary-button analyze-submit"
            disabled={!selectedFile}
            onClick={() => {
              alert(
                "The interface is ready. We will connect it to the Harmivo backend next.",
              );
            }}
          >
            Analyze song
          </button>

          {!selectedFile && (
            <small className="upload-hint">
              Select an audio file to continue.
            </small>
          )}
        </aside>
      </div>
    </div>
  );
}