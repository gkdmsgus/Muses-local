import { Mail, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import profileimg from '../../../assets/images/profileimg.svg';
import { getMyInfo, updateMyProfile } from '../../../api/user';
import type { Member } from '../types/apitypes/members';
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
  const [member, setMember] = useState<Member | null>(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nickName: '',
    introduction: '',
    birthday: '',
    gender: 0,
  });

  // 1️⃣ 기존 내 정보 불러오기
  useEffect(() => {
    const load = async () => {
      const data = await getMyInfo();
      setMember(data);

      setForm({
        nickName: data.nickName,
        introduction: data.introduction,
        birthday: data.birthday,
        gender: data.gender,
      });
    };

    load();
  }, []);

  // 2️⃣ input change 핸들러
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: name === 'gender' ? Number(value) : value,
  }));
};


  // 3️⃣ 저장
  const handleSubmit = async () => {
    try {
      await updateMyProfile(form);

      alert('수정이 완료되었습니다');
      navigate('/mypage');
    } catch (e) {
      console.error(e);
    }
  };

  if (!member) return null;

  return (
    <div className="w-full min-h-[713px] px-64 pb-20 relative bg-white80 inline-flex flex-col justify-center items-center overflow-visible">
      <div className="left-0 top-0 absolute" />
      <div className="w-full max-w-[896px] px-6 pt-24 flex flex-col justify-start items-start gap-8">
        <div className="self-stretch p-8 bg-white rounded-[40px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-white80 inline-flex justify-start items-start gap-6 overflow-hidden">
          {/* 프로필 이미지 */}
          <div className="w-32 h-32 relative">
            <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full border border-stone-300">
              <img
                src={profileimg}
                alt="profile"
                className="w-24 h-20"
              />
            </div>
            <button className="flex absolute top-[75%] right-[3%] w-7 h-7 bg-[#FAFBFD] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] items-center justify-center cursor-pointer hover:bg-[#e7e7e7]">
              <Pencil size={12} />
            </button>
          </div>

          <div className="w-[608px] inline-flex flex-col justify-start items-start gap-3">
            {/* 레벨 */}
            <div className="px-3 py-1 bg-[#EEF2FF] rounded-full inline-flex justify-start items-start">
              <div className="justify-center text-[#4F46E5] text-xs font-boldFont leading-4">
                Lv.{member?.supportLevel} 열정적인 서포터
              </div>
            </div>

            {/* 닉네임 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-44">
                    <div className="justify-center text-[#374151] text-sm font-mediumFont leading-5">
                      닉네임
                    </div>

                    <button
                      type="button"
                      className="p-1 bg-[#E7E7E7] rounded-[5px] flex justify-center items-center gap-2.5 cursor-pointer hover:bg-black40"
                    >
                      <div className="text-[#374151] text-xs font-boldFont leading-5">
                        중복확인
                      </div>
                    </button>
                  </div>

                  <div className="w-64 p-3 bg-color-white-solid rounded-xl border border-[#D1D5DB] inline-flex justify-center items-start overflow-hidden">
                    <input
                      name="nickName"
                      value={form.nickName}
                      onChange={handleChange}
                      className="flex-1 bg-transparent outline-none text-base font-mainFont"
                    />
                  </div>
                </div>

                {/* 저장 버튼 */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-black rounded-full inline-flex justify-center items-center cursor-pointer transition hover:bg-solidBlue"
                >
                  <div className="text-white text-sm font-boldFont leading-5">
                    프로필 편집
                  </div>
                </button>
              </div>

              {/* 이메일 (수정불가) */}
              <div className="self-stretch inline-flex justify-start items-center gap-44">
                <div className="justify-center text-[#374151] text-sm font-mediumFont leading-5">
                  이메일
                </div>
              </div>

              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch p-3 relative bg-color-white-solid rounded-xl border border-[#D1D5DB] inline-flex justify-center items-start overflow-hidden">
                  <div className="flex-1 inline-flex overflow-hidden">
                    <div className="flex self-stretch items-center gap-2 text-black40 text-base font-mainFont">
                      <Mail size={20} />
                      <span>{member?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 소개글 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch text-[#374151] text-sm font-mediumFont leading-5">
                소개글
              </div>
              <div className="self-stretch p-4 bg-color-white-solid rounded-xl border border-[#D1D5DB] inline-flex justify-start items-center overflow-hidden">
                <textarea
                  name="introduction"
                  value={form.introduction}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-sm font-mainFont leading-6 resize-none"
                />
              </div>
            </div>

            {/* 생년월일 + 성별 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-start items-start gap-7">
                {/* 생년월일 */}
                <div className="flex-1 h-20 inline-flex flex-col justify-center items-start gap-1">
                  <div className="self-stretch text-[#374151] text-sm font-mediumFont leading-5">
                    생년월일
                  </div>
                  <div className="w-44 flex flex-col justify-start items-start">
                    <div className="self-stretch px-4 py-3.5 bg-white rounded-xl border border-[#D1D5DB] inline-flex justify-center items-start overflow-hidden">
                      <input
                        type="date"
                        name="birthday"
                        value={form.birthday}
                        onChange={handleChange}
                        className="flex-1 bg-transparent outline-none text-base font-mainFont "
                      />
                    </div>
                  </div>
                </div>

                {/* 성별 */}
                <div className="flex-1 inline-flex flex-col justify-center items-start gap-1 ml-20">
                  <div className="w-32 text-[#374151] text-sm font-mediumFont leading-5">
                    성별
                  </div>
                  <div className="w-20 h-12 flex flex-col justify-center items-end">
                    <div className="self-stretch h-12 px-4 py-3.5 bg-color-white-solid rounded-xl border border-[#D1D5DB] inline-flex justify-center items-center gap-7 overflow-hidden">
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="bg-transparent outline-none text-base font-boldFont cursor-pointer"
                      >
                        <option value={0}>남자</option>
                        <option value={1}>여자</option>
                      </select>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
