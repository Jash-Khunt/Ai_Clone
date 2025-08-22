import { message } from 'antd';

export const validateAndFormatFiles = (
  incoming: File[],
  existing: { name: string }[]
): { valid: boolean; files: { uid: string; name: string; type: string; url: string }[] } => {
  const totalIncoming = incoming.length;
  const totalExisting = existing.length;

  if (totalIncoming + totalExisting > 5) {
    message.error('You can upload up to 5 files only.');
    return { valid: false, files: [] };
  }

  const result: { uid: string; name: string; type: string; url: string }[] = [];

  for (const file of incoming) {
    const isImage = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.type);
    const isPdf = file.type === 'application/pdf';

    if (!isImage && !isPdf) {
      message.error(`"${file.name}" is not a supported image or PDF.`);
      continue;
    }

    if (isPdf && file.size > 10 * 1024 * 1024) {
      message.error(`"${file.name}" exceeds 10MB.`);
      continue;
    }

    const alreadyExists = existing.some(f => f.name === file.name);
    if (alreadyExists) {
      message.warning(`"${file.name}" is already uploaded.`);
      continue;
    }

    result.push({
      uid: `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    });
  }

  return {
    valid: result.length > 0,
    files: result,
  };
};
