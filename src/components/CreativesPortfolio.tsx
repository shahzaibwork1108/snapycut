import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CreativesPortfolioProps {
  onOpenBooking: () => void;
}

export default function CreativesPortfolio({ onOpenBooking }: CreativesPortfolioProps) {
  const [isPlaying] = useState(true);

  // Clean data: Sirf images
  const row1Creatives = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLjJVKnOuEnn5D49yefXjinz8DbnRgCOkfQ&s",
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&h=600&q=80",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QDw8PDg4QEA0PEA4QDxAQDQ8OEA4QFRUWFhYRGBYYHCkhGBolHhUVITIhJi0rMDA6Fx8zODMtNygtLi0BCgoKDg0OGBAQGi0lHx0tLS0tLS0tNy0rNS0tLTcrLS0tLS0tKy0rLS0tLSstKy8tLS4tLS03NS0tKy0tLS0tLf/AABEIAQMAwgMBIgACEQEDEQH/xAAcAAADAAIDAQAAAAAAAAAAAAAAAQIFBgMEBwj/xABBEAACAgECBAQCBwQIBQUAAAABAgADEQQhBRIxQQYTUWEicQcUMkJSgZFDY6HRIzRTcqKx4fAkYpLB8RUWM3OC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwUE/8QAIBEBAQEBAAICAgMAAAAAAAAAAAERAiExAxJBUSJh8P/aAAwDAQACEQMRAD8A4wJyASQJaifK7KAnIBJEtRAoTkWSJYgUJYkiWIFCWJIliBQliSJYgUJYkiWIFCWJIlCBQliSJYgMSxJEoQKEoRCUIDEoRCUIDhCEDz4CcgkgSxAoTkAkqJYgUJYkiWIFCWIhLEChLEkSxAYliIShAoSxJEsQKEoSRLEChKEkSxAoShJEsQGJQiEoQGJQiEoQHCEIGgCcgEkSxAoSwJIliBQnIJIliBQliSJYgUJYkiWIFCUJIliBQliSJQgUJYkiUIFCWJIlCBQlCSJYgMShEJQgMShEJQgOEIQNCEsRATkAgMSxEBLAgMSxEBLAgMSxEBLAgMSxJAlgQGJYiAlAQKEoRASwIDEoRASgIFCUIgJQEBiUIgJQEBiUIhKEBiUIhKEAhHCBo4E5AIASwICAlgRgSwICAlgQAk6jUV1KXsdUQYHMxAGTsB8z6QOUCcOp1ldRRWJNlhxVUitZbafREXJb8unedfW3slXn6m1eHaM9LtQmdVftnFOnO4Pu4yMfYI3mR8CcZ4TqjfRoRemoKc1tmoTGp1FQblLeYScrk45RgDOwE1iaKOE6y5WZj9XAwBTWabdUCe72NmuvG+VAf5jpMmPCbcqka7UrbjfI0ttZb0I8oEj5FZsyrgADoABuSTt7mOTRor+dRatGrCB3z5F1fMKdTgZKgHJSwbnkJO24JwcdoCbNxLQVaipqb15q2x3KsrA5V1YbqwOCGG4ImpFbdNaum1TcxfP1bU4CrqgBnkbGy3ADdejAcy9wodoCUBACUBIoAlAQAlAQACWBEBKAgMCUIgJQgMCMQEoQAShEJQgEI4QNNAlgQAlQACNmABJIAG5JOAB6zq8R1y0VtYwLYwFVRlrHJwqKO7E4A+czXBvC3OUt4gvnWggmg7aTTt1ChP2zDb42yMjYL1lxGL0KajV/1KseSeuruDLpx71gfFcf7uF6/EJrHjDxZVwrUvp9NUdTxOoKH1urAK6csobFFI+Fdm67e/NPbJjdToNNbYt31Wi3UV4CXPTWz143GHIz69JZZDHh3BvAfFeL2fXOJXPTS2CbtTk3OuT8NdW2B6dBvtmev+FPC+k0FbLoqirMFD6m089t2/qeg74AA9szNWciYa1svg4BPXbflX9f1g9hsACcwVgpL9AUPUKfxSXq0kMutZwOZ7CMkDdiM4zv23nJp71deZc9SCCMEEdQZ1NO5SzktGbCvLXZ/aqN+X2MrQ02hV5iFGS7DGWZickH0EyrvTrcS0FWoqam9Oet8ZGSpUg5V1YbqwOCGG4InJc5BUDbIY5ABO2Nhnvv/AwqLZ36EHr1B/L8/wBJRp/9LprV02qbm58jS6nAA1QAz5b42W4AbjowHMvcL3gJnuI6CrUVPTenPW+MjJBBByGUjdWBAIYbggETVlNumtXS6pufnJGl1RAA1IAz5b42W8AdOjAcw7qtR3RKAgBKAkUAShEBKEBiMCAlCACUIhKEAEoRCUIBFKigaeTOG24CVa01Lxfxk0VErux2HzMqObxBxhVfTEHmanU6fUeWCMuKnDlfzxj857PoNbVqKq76HFlNqhkcdCP+xHQjtgifIj62xrDYzEsep9vSegfRv45fRWcrln0lrZurG7K3Tzqx+LplfvAfiG+7ziS6+g5w6jm5cVjBY4zt8GerY7x6XU121pbU62VWKHR1OVdT0IM5ZzadHRsCzLYoW/HxH+0XpzKfT2hoKc0itwwwWXqVJAbY5E7NipkMwBZMkdyI1c4yRgds9YHJMf5z53LBsjYbdtx/sd53AzHGBge43P5Tr6viNdexPM34V3I+fpFHaAyBzAZ2J22zGBMOeO/utv8A7P8ASUOOD+yOf7/+kmwysvOtxHQ1aip6b0D1OBkZIIIOQwI3VgQCCNwQCJ06ONKTh1KA988wHz2mUByMjcHv2llGno1umtXS6ti4ckaTVEADUgDPlPjZbwB06OBkfeUZECZfiGhq1FT03oHqcYZSSDkHIYEbqwIBBG4IBE1qtrdNaum1TFw5xpdUQB9Yxv5VmNluA/JwMjfIFRkBGIAShIoEoRCUIAJQiEYgMRiAjgEI4QNItWaz4k4SL62Uj5exm2sk611GZR4RxDRPQ5Rx8j2InDTaVORPU/EvAFuQ7fF2PcGeYa7SPS5Rxgj9CPWduevtMrnZj0r6N/Hh0beVcWfRWHLqMs1LHrcg7j8Sjr1G+Q3u9FyuqvWyvW6hkdWDK6kZDAjqCJ8eaa8oQQe+fl7z1X6NPHv1UjT6hidE5znqdKx62D92Tuw7faH3pjrlqV7ayb5XHMepOf1x67CNKwDk7t6n/KUjAgFSCpAIIOQQehB7iOc2nV4jay1kr8iR1Ueo/hNcpQsRgjOR9rGB7nPUTbGUEYO4M1fxQ2m0Gns1d9rLUmPhCB3dz9mtdxkn+ZOwkstWVmM1IABapI6/Hj/Cuwmr+O/G+g4fWnNV9Y1NmTXUh8rYdXZ8fCv5HP6kefV+PeJ6gs+h4UbNOhw5FOo1BHfBevAU49u80/xV4jGt1FOp8nksrrVHrY+ZWSjswI6HB5twfTrOnPF3yxep+G7p9JPEa8ai3gqfUzghmr1a5U4wfNYld/Xlnpfg/wAWaDiVQto5arUOLKX5FsqPbcdVPYj+ByJ0PBvEtHxfSl05efHJqdNYOc1lgdiMgMh3wcYPzBA0Dxh4P1fBdTXreHl7NIzgfDWbG0+TvS65+Os9t+wGQcEsl8ZlPT2+zVov2sgfi5W5P+rpI1emp1NT1WKtlLjDDPpuCCNwwOCCNxgETUeDcRayqu9Q9RcZKMrKQc4IIYbjb85mOGXYuXkBAfIdeo2Gc+0563jqIbNNYum1LF1c40upIA8/v5VmNhcB+T4yN8gZGZPW6Su6tqrkD1uMMp/UEEbgg4II3GAZr6GzTWLp9QxdHONNqT+1/dWdhaB36PjI3yJUd4RiEYgMRiAjgMRxCOAQjhA1Tlksk5sQ5YHQvozNP8U+HVuQkDDjdT6Gb4yTrX0ZlR8+6vTPU5Rxhh/H3laTUlCCDjf9J6X4t8NC5SyjFg3U4/hPMdRQ1bFHGGU4InbnqdRizHsH0Z+PRQF0uqf/AIM7VuT/AFQnsf3J/wAP93PL7PPj3Q6oow3/AD9P9J7H9GPjsVBNHq3xpiQtFrH+rMdhUxP7I5AU/d6dMY59ctSvXmOAe80P6XeA6jX8OxpkL26e5b/KXraoVlYKO7Dmzjvggb4m+zra/VeUnMF5jnA3wB85mXPK+2kfQ7xF/wD0lEvpFC6e22lG+ybyGLMeTGeYFsHrkg+8xP8A7J07cVu1zNzG6+100oqXymDqQyvnPPzAsSB6nrN/0OnW5jZa/O4O6DZV/n/56z55v8R26PjOp1qkW3VX61aFsLsicxsrXbP2VDHCj2mud63C5Pb0XV8Ep4ZbUa9Ka6rcKpqRnvQpkl8g8+OnrtzZx8IlV+OtEUZjbY/lnlblotzn0wVGP0nmmn8W223/AFjXai9rgWPmIBzYxsiAEKoz7Y6+s3nifiWnjn1YV3PTdSzCxLawAQ+B8Px8rk4GDkEfFscgDn1xZtr059Pmnx8fb8Xcnnx/vPp2NJ9Imkuvropo1VzWMqr5VAc4zuQvNzHAycY7T1jSaRKx8IyxAyx6n29h7TyDg3iLhXCKbKar0N6fbailmv1BJJCG3ocemQBt1O5in6ZkWwZo1HlY+JjajsD7Idj/ANQmvr+o83rxcte1Th1mlruraq1A9bjDKe/oc9iDuCNxiYHw54uo1la21sGrY8vMoIKNtlXU7qdx+o7HM2SQa2vmad1o1DF0c40+oP7X91Z6Wj16N88id6ZDV6ZLUau1Q9bjDKe/8j3B7YmEXn07rTexdGONPef2npVZ6Weh+9j1yIHcjhHAccUcBwhCBrWI8RgSsQOPlksk5sQxAx2o04Imi+MPDAtUugxYvQ+vsZ6QyTp6nTAjpLLiPna6pkYqwIZTgg9p2dBrChwd1O2+4x6H1E3/AMZ+FvMBtqGLB/iHoZ5tYhUlWGGBwQexnaWdRj093+jPx0MV6LV2fAcJprnbJU9Focnt2Vj7Kd8E+l6/TeYhUHDbEHfqPWfJXDtbyHlbdTsQdwQexnuX0a+OfM8vRax8scLpb2bJf0osJ+/+FvvdD8W7cuuW5WwPXZU2/MjdiDjPyM0rxx4UqbRa3UaTSBtUwFltiqS3KHDWMu+ASMk43O/WevsoPUA/MZnFq7OStmBxyjbbv2mJ4urfLxj6EtLoLqtQlif8XW3PY71BlNJwFAsIwu+fh6nrvjbDeO9PptJxrl0aKgddMycgJVbWOCQARjJAO3eescK0OmrflShE81+Z/LVKQzn7x5Rudz/lPIPpFvrq8RsX5hp9PboebGWYVhKnfHqd2nTn+Vq8d34rOp7jcuIeCuBaa19bxDUk1c/N5XxhLGwfhOBzMT1wuOh7bTucZ8d+HrOF20qEZGpZK9GNK1bo/L8IHw8qYODzA7Y2yZrHGuM8T4u3Jw/hvlaEMrHz0VvNAOQbGs+ELsNl/UzaNB4A4KBW9+kZr8KbK6r73oFncLzEFlz6xMk/kd935Or1+/6an9CmjvZtSwDeQ/lovXla0EkkfJTv8xPeQJj+E16atRVp6lpCr8NYr8shfb2mRmbduszxME4tTp0tRq7FDVuMMp6H+R95yzFvxK1nsWmjnSo8ru1orBYDJUZESaOsOeh1quYsjHFF56v6VWelnofvfPInbnPU9epoBK81VqkFW+eCPmCOvtOhoS2HrdizU2NUWPVwArKx9+V1z75hXZjijkBCOEDXcSsQAlAQFiGJWI8QIKzjZJz4iKwMbqtMGB2nnHjXwpzZupX+kHUfiH856syTo6vShgQRLLiPnFgQSCMEbEHYiZLhmv5Tytup2+c27xv4TOWvoX4urKPvD1+c8/Ix8528dRj1X0V9HHjf6wE0erfOoxii5j/WQB9hv3oA/wD0BnqCJv11YdWU9GGDPk3hPEipCsT1BBBIIIOQQRuCCAQR6Znvn0e+NRqwul1Tj64B/RWHAGrUDJ9haB1HfHMO4XlY3KyGs0bVNhvs9m7Ef77TH2cGpttNn1euy3bNnlBrDjYb49AOs3mKYxrWF0vDrGAWweXSvRF2zj/fUzIL5VYwtbflTYc/nich1Izj/wAd+/6TmU5iRGO0+mLOXCGusYKg7MGB6gfdBGQRMiTjJOwG5J6ATranWcp5K0ay04wqghV3wSz4wuP19txOJuHeYebUEv8AZIpyPJrYdcbAvv3bMsg5NLrRax8tS1IB/puiswI2XP2h1+IbbSNVwqmwsWDDn5ecI7KtmOnMBsZ27bFRSzsqIoyzMQqqB3JOwE1vifiXIPkHy6gMnUWLgketaN2/52wPQNKjMarWU6ZFTG+D5VKbu+PQenqx2Hczo8NyVZmILu7WOV+zzt2HqAAqg9+XM13TJZa55dgTmx7Cz2245huTv15SO25ACzatPUEUKO38TCuQRiEJA4QhAwIEYEvlhiBIErEMRgQFiPEeI8QIKzjdJz4iIgYrWaQMCCJ5X438JlC19C+7qB19xPZXSY/XaMOCCOssuJZr5vmb4LxQqVBYqykMrKxVlYHIZSOjA75ma8beFDSzX0r8ByXUDp/zCaWDO3jqMeZX0z4B8ZLrUFGoYDWouc7KuqQdbFHZhtzL2zkbHbcCMz5W4HxdlKkOyWVkPW6nlZHXoynsf5kHIJB9/wDBHi9NcgquKprkHxIPhW9R+1rH+a/d+RBPKxt3NbxLkawInOtRAsHmhTnuQuCSB3PbMydDpqKAVLqlg3KnkcYOCMj5YnDq+C1WWGzNiOchjW4XmyMHOQeo2nJqNTp9HSOdhVUvwqN2Z268qqN3Y+gyZPA7Ol0yVLyVqFXrgdz6k9z7mY3ivH66WausedqB1rVgFqz0Nr9E+W7HsDMBxbxBdaMAtpqDkBVYfWrts4LDaoEA/CuW916TFLpjYPKrQCkqQUUFVBY5Ylgdye/c5OTCuPXeITfeqMTqWVviKLy6TSY6EA/bs26nLenJ0ne0mhstKtZ1BJ5iuGJPUgHPLsces73DOCpWB8I26AABV+QmaqqAgcWi0ioNhO7EBHIHHFHAI4oQMTDEIQFiGI4QCEI4BiGI4QJInG6TmhiBh9foQ6kEZzPIPGnhRtOzXUqTUTllA+x7/Ke6Mkx+u4etikMAQZqXEfOKIc5HWbTwTXg8q2HDAgqwPKQR0ZT2P8RM3xzwM6OW06c1ZOeUdV+XtOppfCWpY/8AxEf3iBF61W58P4treUAa/UcoGACa7Dj3axWY/rO5USX52Z7LiCOd3e2zB6qCxPKu3QYExnBPBtq4NtrAfgR2Am66DhddQwqj595kYzRcJLYZwB8KqQOpA6An03O3vM7p9KqgADAnYRJyAQEqSwIQgOEIQHCEIDhFCBioQhAIQhAI4oQHHFHAI4sSgIBDljAlAQOI0g9pS0D0nKBLAgQqTkAjAlAQARxgR4gKOGI4AIQhAI4QgEIQgYqEIQCEIQCOEcAjAgJQEBASgIwJYECQJYWMCWBAkCWBGBKAgICPEcIBiGI4QCEIQCEIQCEIQCEIQMVCEIBGIo4BKEQlCAwJQEQE5FEAAlgQAnIBAQEoCMCOAo4RwCEIQCEIQCEIQCEIQCEIQCEIQMVCEIBHCEChKEIQLE5FhCBYnIIoQKjhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCB//2Q==",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&h=600&q=80"
  ];

  const row2Creatives = [
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=600&q=80",
    // "https://images.unsplash.com/photo-1589330694653-ded6df53f6ee?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=600&q=80"
  ];

  const duplicatedRow1 = [...row1Creatives, ...row1Creatives, ...row1Creatives];
  const duplicatedRow2 = [...row2Creatives, ...row2Creatives, ...row2Creatives];

  return (
    <section className="relative py-24 bg-[#010101] overflow-hidden border-t border-neutral-900/40" id="creatives-portfolio-section">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80%] h-[280px] rounded-full bg-purple-950/20 blur-[130px] pointer-events-none select-none" />

      <div className="w-full relative z-10 text-center">
        <div className="mb-14 flex flex-col items-center justify-center max-w-7xl mx-auto px-4" id="creatives-header">
          <h2 className="text-4xl sm:text-6xl font-black font-cabinet text-white tracking-tight flex items-center justify-center flex-wrap gap-x-3 leading-tight">
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#e0f5a0] px-1">
              Creatives
              <svg className="absolute left-0 bottom-[-8px] w-full h-3" viewBox="0 0 160 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6C35 2 110 2 159 4" stroke="#c1eb40" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-white font-black">Portfolio</span>
          </h2>
        </div>

        {/* Row 1 */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#010101] via-[#010101]/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#010101] via-[#010101]/40 to-transparent z-20 pointer-events-none" />
            <div className="flex items-center gap-8 w-max px-4 animate-marquee-left">
              {duplicatedRow1.map((img, idx) => (
                <div key={idx} className="flex-shrink-0 w-[240px] sm:w-[320px] md:w-[380px] aspect-square rounded-[2rem] overflow-hidden bg-neutral-950 border border-neutral-900 shadow-2xl group cursor-pointer">
                  <img src={img} alt="creative" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ))}
            </div>
        <div className="relative w-full overflow-hidden py-4 mt-4">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#010101] via-[#010101]/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#010101] via-[#010101]/40 to-transparent z-20 pointer-events-none" />
          <div className="flex items-center gap-8 w-max px-4 animate-marquee-right">
            {duplicatedRow2.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-[240px] sm:w-[320px] md:w-[380px] aspect-square rounded-[2rem] overflow-hidden bg-neutral-950 border border-neutral-900 shadow-2xl group cursor-pointer">
                <img src={img} alt="creative" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-14 max-w-4xl mx-auto px-4 relative z-20 text-center">
          <button onClick={onOpenBooking} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C1EB40] px-6 py-3.5 border border-[#C1EB40]/30 text-xs font-bold text-black hover:bg-[#aed83a] transition-all cursor-pointer">
            Claim Your Free Design Concepts Now <ChevronRight size={14} />
          </button>
        </div> */}
      </div>
    </section>
  );
}
