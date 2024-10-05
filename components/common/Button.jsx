export default function Button({ children, icon }) {
  return (
    <button
      //   disabled={isValid}
      className="flex justify-center items-center gap-3 px-6 py-2 mt-4 md:m-0 rounded-lg transition-all duration-500 bg-gradient-to-br from-[rgba(255,74,0,1)] via-[rgba(0,157,255,1)] to-[#009dff] bg-size-200 bg-pos-0 hover:bg-pos-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {icon}
      {children}
    </button>
  );
}
