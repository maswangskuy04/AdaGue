import { Check, CheckCheck } from "lucide-react";
import { formatWithUserTimeZone } from "../../../utils/date";

const MessageItem = ({ isOwn, content, time, isRead, isFirst }) => {
  return (
    <div className={`flex w-full ${isOwn ? "justify-end" : "justify-start"} ${isFirst ? "mt-3" : "mt-1"} px-4`}>
      <div
        className={`relative max-w-[82%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] transition-all duration-300 backdrop-blur-xl saturate-[1.8] shadow-sm
          ${isOwn
            ? `bg-indigo-600/85 text-white border border-indigo-500/30 rounded-[20px] ${isFirst ? 'rounded-tr-sm' : ''}`
            : `bg-white/95 text-zinc-600 border border-zinc-200 rounded-[20px] ${isFirst ? 'rounded-tl-sm' : ''} shadow-inner`
          }
        `}
      >
        <div className="px-4 py-2.5">
          <p className="text-[15px] leading-normal tracking-tight font-[450] wrap-break-word whitespace-pre-wrap">
            {content}
          </p>

          <div className="mt-1 flex items-center justify-end gap-1.5 select-none opacity-85">
            <span className={`text-[10px] font-medium tracking-tight ${
              isOwn ? "text-indigo-100" : "text-zinc-500"
            }`}>
              {formatWithUserTimeZone(time)}
            </span>

            {isOwn && (
              <div className="flex items-center gap-1">
                {isRead ? (
                  <>
                    <span className="text-[9px] text-sky-200 font-medium">Dibaca</span>
                    <CheckCheck size={14} className="text-sky-300 drop-shadow-sm" />
                  </>
                ) : (
                  <Check size={14} className="text-white/60" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem