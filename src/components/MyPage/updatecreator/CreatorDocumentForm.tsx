import { ChevronLeft } from 'lucide-react';
import SubmitFile from './SubmitFile';
import {
  type CreatorDocType,
  type CreatorType,
  creatorDocumentConfig,
} from '../types/creatorDocumentConfig';
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  submitCreatorApplication,
  uploadCreatorDoc,
} from '../../../api/updateCreator';

interface Props {
  type: CreatorType;
  onBack: () => void;
  onSuccess?: () => void;
}

const CreatorDocumentForm = ({ type, onBack, onSuccess }: Props) => {
  const { title, files } = creatorDocumentConfig[type];
  const rowCount = Math.ceil(files.length / 2);

  const [uploadedFiles, setUploadedFiles] = useState<CreatorDocType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (fileConfig: (typeof files)[number]) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        try {
          setLoading(true);
          const res = await uploadCreatorDoc(fileConfig.docType, file);
          setUploadedFiles((prev) => [...prev, res.docType]);
        } catch {
          alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
        } finally {
          setLoading(false);
        }
      }
    };
    input.click();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const res = await submitCreatorApplication();
      if (res.missing.length > 0) {
        alert(`누락된 서류가 있습니다: ${res.missing.join(', ')}`);
        return;
      }
      alert('크리에이터 전환 신청 완료!');
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="self-stretch inline-flex flex-col justify-start items-start gap-8"
    >
      {/* 상단 */}
      <div className="self-stretch inline-flex justify-start items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-black60 text-sm font-boldFont hover:text-mainBlack transition cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>유형 재선택</span>
        </button>
        <span className="text-[#D1D5DB] text-sm">|</span>
        <span className="text-[#4F46E5] text-sm font-boldFont">{title}</span>
      </div>

      {/* 파일 */}
      <div className="relative w-[624px]" style={{ height: rowCount * 158 }}>
        {files.map((file, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);

          return (
            <div
              key={idx}
              className="absolute"
              style={{ left: col * 312, top: row * 158 }}
            >
              <SubmitFile
                content={file.content}
                condition={file.condition}
                className={
                  uploadedFiles.includes(file.docType)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }
                onClick={
                  uploadedFiles.includes(file.docType)
                    ? undefined
                    : () => handleFileChange(file)
                }
              />
            </div>
          );
        })}
      </div>

      {/* 제출 */}
      <button
        type="submit"
        className="self-stretch py-4 bg-[#4F46E5] rounded-xl inline-flex justify-center items-center hover:bg-[#433cba] transition cursor-pointer"
      >
        <span className="text-white text-lg font-boldFont">
          {loading ? '업로드 중...' : '제출하기'}
        </span>
      </button>
    </form>
  );
};

export default CreatorDocumentForm;
