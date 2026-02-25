import { useState } from 'react';
import ModalLayout from './ModalLayout';
import { TypeSelector } from './TypeSelector';
import CreatorDocumentForm from './CreatorDocumentForm';
import {
  type CreatorType as CreatorKind,
  creatorTypeToApi,
} from '../types/creatorDocumentConfig';
import { X } from 'lucide-react';
import { createCreatorApplication } from '../../../api/updateCreator';

interface CreatorTypeProps {
  onClose: () => void;
}

const CreatorType = ({ onClose }: CreatorTypeProps) => {
  const [type, setType] = useState<CreatorKind | null>(null);
  const [applicationCreated, setApplicationCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (selectedType: CreatorKind) => {
    if (!applicationCreated) {
      try {
        setLoading(true);
        await createCreatorApplication(creatorTypeToApi[selectedType]);
        setApplicationCreated(true);
        setType(selectedType);
      } catch {
        alert('신청 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    } else {
      setType(selectedType);
    }
  };

  return (
    <ModalLayout onClose={onClose}>
      <div className="self-stretch pb-4 border-b border-white80 flex justify-between items-center">
        <div className="text-mainBlack text-xl font-boldFont">
          크리에이터 전환 신청
        </div>
        <button
          onClick={onClose}
          className="p-2 bg-white80 rounded-full hover:bg-white60"
        >
          <X size={20} />
        </button>
      </div>

      {type === null ? (
        <TypeSelector onSelect={handleSelect} />
      ) : (
        <CreatorDocumentForm
          type={type}
          onBack={() => setType(null)}
          onSuccess={onClose}
        />
      )}

      {loading && (
        <div className="absolute inset-0 bg-black/20 flex justify-center items-center">
          <span className="text-white font-boldFont text-lg">
            신청 생성 중...
          </span>
        </div>
      )}
    </ModalLayout>
  );
};
export default CreatorType;
