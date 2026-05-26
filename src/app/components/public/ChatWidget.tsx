import { useState } from "react";
import { MessageCircle, X, ChevronRight } from "lucide-react";

const CHANNELS = [
  {
    name: "WhatsApp",
    description: "Chat instantly",
    href: "https://wa.me/84900000000",
    bgColor: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Zalo",
    description: "Nhắn tin Zalo",
    href: "https://zalo.me/0900000000",
    bgColor: "#0068FF",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.07 4.91c-.097.444-.36.556-.73.346l-2.016-1.487-1.025.986c-.114.114-.21.21-.43.21l.153-2.173 3.95-3.567c.17-.154-.037-.24-.264-.086l-4.886 3.075-2.106-.656c-.458-.143-.467-.459.095-.68l8.218-3.168c.382-.14.715.093.591.69l.52-.4z"/>
      </svg>
    ),
  },
  {
    name: "WeChat",
    description: "微信咨询",
    href: "#wechat-qr",
    bgColor: "#07C160",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.168-.054l1.9-1.106a.59.59 0 01.605-.017c1.017.433 2.133.67 3.304.67h.684c-.048-.31-.081-.624-.081-.945 0-3.594 3.184-6.509 7.117-6.509.22 0 .438.011.652.03C16.726 4.271 13.002 2.188 8.691 2.188zm-2.273 4.65a.787.787 0 110 1.573.787.787 0 010-1.573zm4.546 0a.787.787 0 110 1.573.787.787 0 010-1.573zm5.326 2.628c-3.346 0-6.059 2.395-6.059 5.35 0 2.954 2.713 5.35 6.059 5.35.89 0 1.735-.188 2.49-.523a.47.47 0 01.473.012l1.484.86a.24.24 0 00.132.042.23.23 0 00.228-.231.34.34 0 00-.037-.166l-.305-1.157a.462.462 0 01.167-.52C22.107 17.478 23 16.139 23 14.816c0-2.955-2.713-5.35-6.71-5.35zm-2.152 3.234a.627.627 0 110 1.255.627.627 0 010-1.255zm4.303 0a.627.627 0 110 1.255.627.627 0 010-1.255z"/>
      </svg>
    ),
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Channel cards */}
      {open && (
        <div className="flex flex-col gap-2 items-end">
          {CHANNELS.map((channel) => (
            <a
              key={channel.name}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-xl shadow-lg text-white transition-transform hover:-translate-y-0.5 hover:shadow-xl"
              style={{ backgroundColor: channel.bgColor, minWidth: "170px" }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 flex-shrink-0">
                {channel.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm leading-none">{channel.name}</div>
                <div className="text-xs opacity-80 mt-0.5">{channel.description}</div>
              </div>
              <ChevronRight size={15} className="opacity-60" />
            </a>
          ))}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2"
        style={{
          backgroundColor: open ? "#333" : "#005897",
        }}
        aria-label={open ? "Close chat" : "Open chat channels"}
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>

      {/* Pulse indicator when closed */}
      {!open && (
        <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full animate-ping opacity-20" style={{ backgroundColor: "#005897" }} />
      )}
    </div>
  );
}
