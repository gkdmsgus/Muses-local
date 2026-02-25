interface ModalLayoutProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalLayout = ({ children, onClose }: ModalLayoutProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-[672px] max-w-[672px] p-8 bg-white rounded-[32px] shadow-2xl inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
