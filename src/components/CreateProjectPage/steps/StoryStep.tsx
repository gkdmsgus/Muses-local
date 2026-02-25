import type { StepProps } from './StepProps';
import type { StoryData } from '../../../pages/CreateProjectPage';
import { Field, InputFrame } from '../components/FormField';
import { Upload, FileText } from 'lucide-react';

export default function StoryStep({ data, onChange }: StepProps) {
  const story = data.story;

  const updateStory = (patch: Partial<StoryData>) => {
    onChange('story', { ...story, ...patch });
  };

  return (
    <div className="self-stretch pb-4 flex flex-col gap-8">
      <h2 className="text-mainBlack text-2xl font-boldFont leading-8">
        Step 4. 상세 스토리 & 정책
      </h2>

      <Field label="프로젝트 소개">
        <InputFrame>
          {/* 에디터 툴바 (UI 전용) */}
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white80 text-black40 text-sm">
            <FileText className="w-4 h-4 cursor-pointer hover:text-black" />
            <button className="font-boldFont cursor-pointer hover:text-black">
              B
            </button>
            <button className="font-mainFont cursor-pointer hover:text-black">
              I
            </button>

            <span className="w-px h-4 bg-white60 mx-1" />

            <div className="py-1 inline-flex justify-start items-center gap-1 cursor-pointer hover:text-black">
              <Upload className="w-3 h-3" />
              <button className="font-mainFont text-sm cursor-pointer">
                이미지 추가
              </button>
            </div>
          </div>

          {/* 에디터 본문 */}
          <textarea
            value={story.story_html}
            onChange={(e) => updateStory({ story_html: e.target.value })}
            placeholder="프로젝트의 이야기를 자유롭게 작성해주세요. 이미지를 드래그하여 넣을 수 있습니다."
            className="
              w-full min-h-[384px]
              resize-none
              text-mainBlack
              placeholder:text-black40
              font-mainFont
              focus:outline-none
            "
          />
        </InputFrame>
      </Field>

      {/* 프로젝트 정책 */}
      <Field label="프로젝트 정책 (환불 및 교환)">
        <InputFrame>
          <textarea
            value={story.refund_policy}
            onChange={(e) => updateStory({ refund_policy: e.target.value })}
            placeholder="예) 펀딩 마감 이후에는 단순 변심으로 인한 환불이 불가능합니다."
            className="
              w-full min-h-[114px]
              resize-none
              text-mainBlack
              placeholder:text-black40
              font-mainFont
              focus:outline-none
            "
          />
        </InputFrame>
      </Field>
    </div>
  );
}
