"use client"

interface Props {
    icon?: React.ReactNode;
    title: string;
    highlight?: string;
    subtitle?: string;
    lastUpdated?: string;
}

export default function PageHeader({
    icon,
    title,
    highlight,
    subtitle,
    lastUpdated
}: Props) {
    return (
        <section className="text-center text-black py-8">
            {/* Icon Circle */}
            {icon && <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[#FED800] text-3xl text-black rounded-full flex items-center justify-center">
                    {icon}
                </div>
            </div>}

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {title}{" "}
                {highlight && <span className="text-[#FED800]">{highlight}</span>}
            </h1>

            {/* Subtitle */}
            {subtitle && (
                <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}

            {/* Last Updated (Optional) */}
            {lastUpdated && (
                <div className="mt-6 inline-flex items-center gap-2 bg-[#FED800] text-black px-4 py-2 rounded-lg font-semibold">
                    {icon}
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            )}
        </section>
    );
}
