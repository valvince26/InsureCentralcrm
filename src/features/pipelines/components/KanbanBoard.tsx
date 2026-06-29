"use client";

import React from "react";
import KanbanColumn from "@/features/pipelines/components/KanbanColumn";
import KanbanCard from "@/features/pipelines/components/KanbanCard";

export default function KanbanBoard() {
  return (
    <section className="flex-1 overflow-x-auto px-8 pb-8 custom-scrollbar">
      <div className="flex h-full gap-4 pt-4">
        
        {/* Column: New Lead */}
        <KanbanColumn title="New Lead" count={12}>
          <KanbanCard 
            id="1"
            badgeType="LIFE"
            badgeBg="bg-primary-fixed"
            badgeText="text-on-primary-fixed"
            duration="2 days"
            name="Robert Patterson"
            value="$1,200/yr"
            avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAlEYX6mt61Vm4wCxa0cYTMxJIh6KTkYZ4sKVCZ29DKciIPiKOek88kBf3DbQTik2oy148B_K5fMzZQKbSgXvw7cSAAh829vu5_hj-tQJf78N5MlJ8FEYfMgSznwbCyXcF6r6HLf3qemFiHu-m19ZY_Tnl18yUKS8KEjPG1r69T7Ir48cJ6Aqq0-pu611yUq8vJWmpvZc3I3dP8tfCUOeIZ5-ud9rRiYFU75pytvNwysLg9DYSLm9mbthGysrcKB19mI1siIlKmIe1E"
            actionIcon="chat_bubble_outline"
            actionColor="text-on-surface-variant"
            borderColor="border-l-primary"
          />
          <KanbanCard 
            id="2"
            badgeType="AUTO"
            badgeBg="bg-secondary-fixed"
            badgeText="text-on-secondary-fixed"
            duration="1 day"
            name="Samantha Reed"
            value="$2,450/yr"
            avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCxz9g6A6IWMhF42_hHKy1zrNQTO8UagT_05IVHlCH4wE7GU2_TkCInp-dxtdfVTekt35ViVRL3ivf28lkjh6df2JtaYxkuHvv0xVODPeyNs5REXaGpwLnmHxSEWPlFX5KUTQuapjXARElvW7_8kk7kIFfsMgbuhN9Gywn5Y61iPkL9mq8qSOrrKiFf4RcobNJH2Mbo6jc2EIYf8RhI5iMjjOe7Ay0bDHzxQs3PzTdV8icjPO4WGnxpSDR-fNK2MdmLkuwH5OPgvDWz"
            actionIcon="attach_file"
            actionColor="text-on-surface-variant"
            borderColor="border-l-secondary"
          />
        </KanbanColumn>

        {/* Column: Attempted */}
        <KanbanColumn title="Attempted" count={8}>
          <KanbanCard 
            id="3"
            badgeType="HEALTH"
            badgeBg="bg-primary-fixed"
            badgeText="text-on-primary-fixed"
            duration="4 days"
            name="Marcus Thorne"
            value="$3,100/yr"
            avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAi_uRABHYTYeXF5fioE1s2Z5mKZUl4BpMWUcco3wNcy0yhbdwluMdWftGPBXegOdCRdIcNZBBeg10R3bTpI5LUvN3w6Pn-2ovyUVK5nmGsrlnerK8_Deat8ADi1DiFqW9dluwau2vqlaV4CC6K9LvZ8AowUERdhQDYoCY1R1flfA_r9S_CYrqYkBHX-zyryZBy-ba7D3_KHV4frC9B1X57xdbT3y58DvgVwYtuzhbiTwawQgCVQPmPWDBxoKGJt5VtS11627esnXff"
            actionIcon="history"
            actionColor="text-error"
            borderColor="border-l-primary-fixed-dim"
          />
        </KanbanColumn>

        {/* Column: Connected */}
        <KanbanColumn title="Connected" count={5}>
          <KanbanCard 
            id="4"
            badgeType="HOME"
            badgeBg="bg-secondary-fixed"
            badgeText="text-on-secondary-fixed"
            duration="1 week"
            name="Linda Chen"
            value="$4,500/yr"
            avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCFzIO8NtNABtQ4syEK-zPY8X3GER1n9SUS8_8pFgnTEiLJDOORA9dkIqhrD3KhKYns-Wt0S1YM6GLuughQxPXxXDB4fYBoW7a2x9RVAsIesLBAGtAaFr4TokceOb-Vd66tLuhECpIGj9-qwgHWj-hMBDF5qUTZaJ_iK2C1gEXSZBa3OcopbPrEWrJKYrYe739sFQjuASoWcmfD7IWOUZlq-zDTflASkmK4iavCXDcY0eW3ouzD_iYNRQf5t5xC21CNhUDC082QtrsE"
            actionIcon="connected"
            actionColor="text-secondary"
            borderColor="border-l-secondary-fixed-dim"
          />
        </KanbanColumn>

        {/* Column: Interested */}
        <KanbanColumn title="Interested" count={6}>
          <KanbanCard 
            id="5"
            badgeType="COMMERCIAL"
            badgeBg="bg-primary-fixed"
            badgeText="text-on-primary-fixed"
            duration="3 days"
            name="Alpha Logistics Ltd."
            value="$12,800/yr"
            avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAKLZrkPTp47EIEKrEw2ishUULl0T0jFcTiWTGXIZywYfpW2RLSqP_wKxyFRwXQFfyms93cBC4mOSl2HvgTljVraa6wFBIb5_jv-UCwbca64r7LcLU6V3EAaTn-eokcDSbucT360lj444UtQmCUL9G8sGyGk_-loNdAvJJSayTRt9ffuEHa30eQ2fSBsShepfz_dmLDRfTAM4TPOHtENax5heh3HI04MtEQ06qbafG-tpzQJ5IZcUqF7XjsPUNzSiKYYkDrPb9sqPOX"
            actionIcon="stars"
            actionColor="text-on-surface-variant"
            borderColor="border-l-primary"
          />
        </KanbanColumn>

        {/* Column: Follow Up */}
        <KanbanColumn title="Follow Up" count={4} isDropTarget={true} />

        {/* Column: Transferred */}
        <KanbanColumn title="Transferred" count={2} opacity="opacity-80" />

        {/* Column: Closed (Won) */}
        <KanbanColumn 
          title="Closed (Won)" 
          count={15} 
          titleColor="text-secondary"
          countBg="bg-secondary-container"
          countColor="text-on-secondary-container text-label-md font-bold"
        >
          <KanbanCard 
            id="6"
            badgeType="LIFE"
            badgeBg="bg-secondary-fixed"
            badgeText="text-on-secondary-fixed"
            duration=""
            name="David Wright"
            value="$1,800/yr"
            avatarSrc=""
            borderColor="border-l-secondary"
            isWon={true}
          />
        </KanbanColumn>

        {/* Column: Lost */}
        <KanbanColumn 
          title="Lost" 
          count={4} 
          opacity="opacity-60"
          titleColor="text-error"
          countBg="bg-error-container"
          countColor="text-on-error-container text-label-md font-bold"
        />
        
      </div>
    </section>
  );
}
