import React from "react";

type Variant = "standardCard" | "premiumCard";

interface PackageCardProps {
  title: string;
  price: React.ReactNode;
  features: string[];
  badge?: string;
  variant?: Variant;
  ctaLabel?: string;
  onClick?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  features,
  badge,
  variant = "standardCard",
  ctaLabel = "Choose Plan",
  onClick,
}) => {
  const base = "p-6 text-center  shadow-md";

  const variantClass =
    variant === "premiumCard"
      ? "bg-gradient-to-b from-button to-buttonHover text-textSecondary shadow-xl"
      : variant === "standardCard"
      ? "bg-standardCard text-textMain"
      : "bg-bg text-textMain";

  const ctaClass =
    variant === "premiumCard"
      ? "bg-white text-button hover:bg-gray-100"
      : "bg-button text-white hover:bg-buttonHover";

  return (
    <div className={`${base} ${variantClass}`}>
      {badge && (
        <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-button">
          {badge}
        </div>
      )}

      <h3 className="text-xl md:text-2xl font-bold mb-2 text-textSecondary ">{title}</h3>
      <div className="text-3xl md:text-4xl font-bold mb-6 ">{price}</div>

      <ul className="space-y-3 mb-8 text-base font-inter">
        {features.map((f, i) => (
          <li key={i} className="flex items-center justify-center gap-2 text-textMain leading-relaxed">
            <i className="ri-checkbox-circle-fill text-yellow-400 text-lg"></i>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button onClick={onClick} className={`${ctaClass} px-6 py-3 font-semibold block w-full transition-colors `}>{ctaLabel}</button>
    </div>
  );
};

export default PackageCard;