import React from "react";
export default function Artwork({ type = "vase", className = "" }) {
  const objects = {
    coffee: (
      <>
        <path d="M128 93h106l11 155H116z" fill="#d9b17c" />
        <path d="M128 93h106v24H128z" fill="#294c39" />
        <rect x="139" y="146" width="84" height="66" rx="2" fill="#f8f0da" />
        <text
          x="181"
          y="169"
          textAnchor="middle"
          fill="#214c38"
          fontSize="10"
          letterSpacing="2"
        >
          CASA DO
        </text>
        <text
          x="181"
          y="189"
          textAnchor="middle"
          fill="#214c38"
          fontSize="19"
          fontFamily="serif"
        >
          GRÃO
        </text>
        <path d="M166 225h30" stroke="#70532d" strokeWidth="2" />
      </>
    ),
    vase: (
      <>
        <path
          d="M160 103h44l-3 39c6 20 35 38 35 70 0 33-108 33-108 0 0-32 28-50 35-70z"
          fill="#c08e6b"
        />
        <ellipse cx="182" cy="103" rx="22" ry="6" fill="#805c43" />
        <path
          d="M180 104q-4-60 24-83M185 90q-35-23-31-48M193 61q32-5 33-25"
          stroke="#6e7c50"
          strokeWidth="4"
          fill="none"
        />
        <ellipse
          cx="156"
          cy="49"
          rx="9"
          ry="22"
          fill="#8c9b6c"
          transform="rotate(-24 156 49)"
        />
        <ellipse
          cx="216"
          cy="39"
          rx="9"
          ry="22"
          fill="#a7ad7b"
          transform="rotate(40 216 39)"
        />
      </>
    ),
    bag: (
      <>
        <path d="M122 135h119l15 113H108z" fill="#e9ddbb" />
        <path
          d="M151 145v-34a31 31 0 0162 0v34"
          fill="none"
          stroke="#bcaa84"
          strokeWidth="10"
        />
        <text
          x="182"
          y="203"
          textAnchor="middle"
          fill="#4f6547"
          fontSize="20"
          fontFamily="serif"
        >
          leve.
        </text>
      </>
    ),
    soap: (
      <>
        <rect
          x="104"
          y="156"
          width="114"
          height="67"
          rx="18"
          fill="#b3bc95"
          transform="rotate(-15 161 190)"
        />
        <rect
          x="164"
          y="124"
          width="109"
          height="65"
          rx="18"
          fill="#e0c9a4"
          transform="rotate(15 218 156)"
        />
        <path
          d="M225 209q27-35 36-79M243 182l-22-12m31-7 19-6"
          stroke="#748259"
          strokeWidth="3"
          fill="none"
        />
      </>
    ),
    bread: (
      <>
        <ellipse
          cx="180"
          cy="189"
          rx="90"
          ry="54"
          fill="#b97d3d"
          transform="rotate(-15 180 189)"
        />
        <path
          d="M133 172l18 37m14-55 18 42m15-48 16 33"
          stroke="#ebc48a"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </>
    ),
    cup: (
      <>
        <path d="M126 140h101v66q0 39-50 39t-51-39z" fill="#bd997b" />
        <path
          d="M226 153q61-5 32 49-10 15-32 11"
          fill="none"
          stroke="#bd997b"
          strokeWidth="14"
        />
        <ellipse cx="176" cy="140" rx="50" ry="9" fill="#77583e" />
      </>
    ),
    shirt: (
      <path
        d="M152 108l-43 22-27 54 40 18 15-29v80h96v-80l15 29 39-18-27-54-43-22q-32 23-65 0"
        fill="#73866c"
      />
    ),
    wellness: (
      <>
        <rect x="133" y="175" width="111" height="48" rx="23" fill="#bca992" />
        <rect x="123" y="140" width="110" height="42" rx="21" fill="#e5d6bd" />
        <path d="M183 135q-40-55-9-83 39 28 9 83" fill="#87986b" />
        <path d="M186 130q16-52 50-42-1 43-50 42" fill="#acb58b" />
      </>
    ),
  };
  return (
    <svg
      className={className}
      viewBox="0 0 360 300"
      role="img"
      aria-label={`Ilustração de ${type}`}
    >
      <defs>
        <filter id={`shadow-${type}`}>
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <ellipse
        cx="183"
        cy="250"
        rx="80"
        ry="10"
        fill="#564734"
        opacity=".13"
        filter={`url(#shadow-${type})`}
      />
      {objects[type] || objects.vase}
    </svg>
  );
}
