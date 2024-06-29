export const getFileType = (fileType: string) => {
  const type = fileType?.toLowerCase();

  switch (true) {
    case type.includes("jpg"):
    case type.includes("jpeg"):
      return "jpg";
    case type.includes("png"):
      return "png";
    case type.includes("mp4"):
      return "mp4";
    case type.includes("audio"):
      return "audio";
    case type.includes("pdf"):
      return "pdf";
    case type.includes("word"):
      return "word";
    case type.includes("excel"):
      return "excel";
    case type.includes("powerpoint"):
      return "powerpoint";
    default:
      return "file";
  }
};

export const getElementType = (fileType: string) => {
  const type = fileType?.toLowerCase();

  switch (true) {
    case type.includes("video"):
      return "video";
    case type.includes("mp3"):
    case type.includes("audio"):
    case type.includes("mpeg"):
      return "mp3";
    case type.includes("pdf"):
      return "embed";
    case type.includes("image"):
      return "img";
    default:
      return "unsupported";
  }
};
