


interface Props  {
  introduction? :string;
}

const ProfileIntro = ({introduction}:Props) => {
  return (
<div className="border-l-4 border-[#E0E7FF] pl-4 py-1 my-3 text-sm text-black80 font-mainFont leading-6">
      {introduction}
    </div>
  );
};

export default ProfileIntro;
