const Button = ({ loading, text, onClick, className, isValid }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      onClick={onClick ?? onClick}
      className={className}
      // id={id ?? id}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
      ) : null}
      {text}
    </button>
  );
};

export default Button;
