const Spinner = () => {
  return (
    <div className="relative w-9.5 h-9.5 before:relative before:content-none before:block before:pt-full">
      <svg
        className="absolute left-0 top-0 animate-rotate w-full h-full origin-center"
        viewBox="25 25 50 50"
      >
        <circle
          className="animate-dash"
          cx="50"
          cy="50"
          r="20"
          fill="transparent"
          stroke="#0b57d0"
          strokeMiterlimit="10"
          strokeDasharray={'1, 200'}
          strokeDashoffset="0"
          strokeWidth={4.5}
        />
      </svg>
    </div>
  );
};

export default Spinner;
