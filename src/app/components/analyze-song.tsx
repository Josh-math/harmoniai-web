"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import AnalysisResult from "./analysis-result";
import InteractiveAnalysis from "./interactive-analysis";

type AnalyzeSongProps = {
  onBack: () => void;
  onOpenPerformance: () => void;
};

const analysisStages = [
  "Preparing audio",
  "Detecting tempo and beats",
  "Identifying chords",
  "Mapping tonal regions",
  "Finding modulations",
  "Building performance suggestions",
  "Finalizing your session",
];

const supportedAudioTypes = [
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
  "audio/x-m4a",
];

const supportedExtensions = [
  ".mp3",
  ".wav",
  ".m4a",
];

export default function AnalyzeSong({
  onBack,
  onOpenPerformance,
}: AnalyzeSongProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [
    audioPreviewUrl,
    setAudioPreviewUrl,
  ] = useState<string | null>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [instrument, setInstrument] =
    useState("Keyboard");

  const [skillLevel, setSkillLevel] =
    useState("Intermediate");

  const [style, setStyle] =
    useState("Gospel");

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [
    analysisStage,
    setAnalysisStage,
  ] = useState(0);

  const [isComplete, setIsComplete] =
    useState(false);

  const [
    isViewingAnalysis,
    setIsViewingAnalysis,
  ] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setAudioPreviewUrl(null);
      return;
    }

    const previewUrl =
      URL.createObjectURL(selectedFile);

    setAudioPreviewUrl(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedFile]);

  function chooseFile(file?: File) {
    if (!file || isAnalyzing) {
      return;
    }

    const normalizedFileName =
      file.name.toLowerCase();

    const hasSupportedType =
      supportedAudioTypes.includes(
        file.type,
      );

    const hasSupportedExtension =
      supportedExtensions.some(
        (extension) =>
          normalizedFileName.endsWith(
            extension,
          ),
      );

    if (
      !hasSupportedType
      && !hasSupportedExtension
    ) {
      alert(
        "Please select an MP3, WAV, or M4A audio file.",
      );

      return;
    }

    setSelectedFile(file);
    setAnalysisStage(0);
    setIsComplete(false);
    setIsViewingAnalysis(false);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    chooseFile(
      event.target.files?.[0],
    );
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    setIsDragging(false);

    chooseFile(
      event.dataTransfer.files?.[0],
    );
  }

  function handleDragEnter(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    if (!isAnalyzing) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    if (
      event.currentTarget.contains(
        event.relatedTarget as Node | null,
      )
    ) {
      return;
    }

    setIsDragging(false);
  }

  function resetFileInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeSelectedFile() {
    if (isAnalyzing) {
      return;
    }

    setSelectedFile(null);
    setAnalysisStage(0);
    setIsComplete(false);
    setIsViewingAnalysis(false);

    resetFileInput();
  }

  function analyzeAnotherSong() {
    setIsComplete(false);
    setIsAnalyzing(false);
    setIsViewingAnalysis(false);
    setSelectedFile(null);
    setAnalysisStage(0);

    resetFileInput();
  }

  function formatFileSize(
    bytes: number,
  ) {
    const megabytes =
      bytes / (1024 * 1024);

    return `${megabytes.toFixed(1)} MB`;
  }

  async function wait(
    milliseconds: number,
  ) {
    await new Promise<void>(
      (resolve) => {
        window.setTimeout(
          resolve,
          milliseconds,
        );
      },
    );
  }

  async function startAnalysis() {
    if (
      !selectedFile
      || isAnalyzing
    ) {
      return;
    }

    setIsComplete(false);
    setIsViewingAnalysis(false);
    setIsAnalyzing(true);
    setAnalysisStage(0);

    for (
      let index = 0;
      index < analysisStages.length;
      index += 1
    ) {
      setAnalysisStage(index);

      await wait(750);
    }

    setIsAnalyzing(false);
    setIsComplete(true);
  }

  if (
    isViewingAnalysis
    && selectedFile
  ) {
    return (
      <InteractiveAnalysis
        fileName={selectedFile.name}
        onBack={() => {
          setIsViewingAnalysis(false);
        }}
        onOpenPerformance={
          onOpenPerformance
        }
      />
    );
  }

  if (
    isComplete
    && selectedFile
  ) {
    return (
      <AnalysisResult
        fileName={selectedFile.name}
        onAnalyzeAnother={
          analyzeAnotherSong
        }
        onOpenAnalysis={() => {
          setIsViewingAnalysis(true);
        }}
        onOpenPerformance={
          onOpenPerformance
        }
      />
    );
  }

  return (
    <div className="analyze-page">
      <button
        type="button"
        className="back-button"
        onClick={onBack}
        disabled={isAnalyzing}
      >
        ← Back to dashboard
      </button>

      <section className="analyze-heading">
        <p className="card-kicker">
          SONG INTELLIGENCE
        </p>

        <h2>Analyze your music</h2>

        <p>
          Upload a song and let Harmivo
          uncover its chords, tonal journey,
          modulations, performance paths,
          and enhancement opportunities.
        </p>
      </section>

      <div className="analyze-layout">
        <section className="upload-panel">
          <div
            className={
              isDragging
                ? (
                  "upload-zone "
                  + "upload-zone-dragging"
                )
                : "upload-zone"
            }
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept={
                ".mp3,.wav,.m4a,audio/*"
              }
              hidden
              disabled={isAnalyzing}
              onChange={handleInputChange}
            />

            {!selectedFile ? (
              <>
                <span className="upload-icon">
                  ♫
                </span>

                <h3>
                  Drop your song here
                </h3>

                <p>
                  MP3, WAV, or M4A
                </p>

                <button
                  type="button"
                  className="primary-button"
                  disabled={isAnalyzing}
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  Choose audio file
                </button>
              </>
            ) : (
              <div className="selected-file">
                <span
                  className={
                    "selected-file-icon"
                  }
                >
                  ♪
                </span>

                <div>
                  <strong>
                    {selectedFile.name}
                  </strong>

                  <small>
                    {formatFileSize(
                      selectedFile.size,
                    )}
                  </small>
                </div>

                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={
                    removeSelectedFile
                  }
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {selectedFile
            && audioPreviewUrl && (
              <audio
                className="audio-preview"
                controls
                src={audioPreviewUrl}
              >
                Your browser does not
                support audio playback.
              </audio>
            )}
        </section>

        <aside
          className="analysis-settings"
        >
          <div>
            <p className="card-kicker">
              YOUR PROFILE
            </p>

            <h3>Shape your results</h3>

            <p>
              Harmivo uses these choices
              to personalize its musical
              suggestions, not the
              objective song analysis.
            </p>
          </div>

          <label>
            Instrument

            <select
              value={instrument}
              disabled={isAnalyzing}
              onChange={(event) => {
                setInstrument(
                  event.target.value,
                );
              }}
            >
              <option>Keyboard</option>
              <option>Guitar</option>
            </select>
          </label>

          <label>
            Skill level

            <select
              value={skillLevel}
              disabled={isAnalyzing}
              onChange={(event) => {
                setSkillLevel(
                  event.target.value,
                );
              }}
            >
              <option>Beginner</option>
              <option>
                Intermediate
              </option>
              <option>Advanced</option>
              <option>
                Professional
              </option>
            </select>
          </label>

          <label>
            Musical style

            <select
              value={style}
              disabled={isAnalyzing}
              onChange={(event) => {
                setStyle(
                  event.target.value,
                );
              }}
            >
              <option>Original</option>
              <option>Gospel</option>
              <option>Worship</option>
              <option>Jazz</option>
              <option>Neo Soul</option>
              <option>Pop</option>
            </select>
          </label>

          {isAnalyzing && (
            <section
              className={
                "analysis-progress"
              }
            >
              <div
                className={
                  "analysis-progress-heading"
                }
              >
                <span
                  className={
                    "analysis-spinner"
                  }
                />

                <div>
                  <strong>
                    Harmivo is listening
                  </strong>

                  <small>
                    {
                      analysisStages[
                        analysisStage
                      ]
                    }
                  </small>
                </div>
              </div>

              <div
                className={
                  "analysis-progress-track"
                }
              >
                <span
                  style={{
                    width: `${
                      (
                        (
                          analysisStage
                          + 1
                        )
                        / analysisStages.length
                      )
                      * 100
                    }%`,
                  }}
                />
              </div>

              <div
                className={
                  "analysis-stage-list"
                }
              >
                {analysisStages.map(
                  (stage, index) => {
                    const
                      isStageComplete =
                        index
                        < analysisStage;

                    const
                      isStageActive =
                        index
                        === analysisStage;

                    let className =
                      "analysis-stage";

                    if (
                      isStageComplete
                    ) {
                      className +=
                        (
                          " "
                          + "analysis-stage-complete"
                        );
                    } else if (
                      isStageActive
                    ) {
                      className +=
                        (
                          " "
                          + "analysis-stage-active"
                        );
                    }

                    return (
                      <div
                        key={stage}
                        className={
                          className
                        }
                      >
                        <span>
                          {isStageComplete
                            ? "✓"
                            : index + 1}
                        </span>

                        <small>
                          {stage}
                        </small>
                      </div>
                    );
                  },
                )}
              </div>
            </section>
          )}

          <button
            type="button"
            className={
              "primary-button "
              + "analyze-submit"
            }
            disabled={
              !selectedFile
              || isAnalyzing
            }
            onClick={startAnalysis}
          >
            {isAnalyzing
              ? "Analyzing..."
              : "Analyze song"}
          </button>

          {!selectedFile && (
            <small
              className="upload-hint"
            >
              Select an audio file to
              continue.
            </small>
          )}
        </aside>
      </div>
    </div>
  );
}