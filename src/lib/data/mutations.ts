export type MutationCategory = "lifecycle" | "slot2" | "unlockable" | "harmful";

export interface Mutation {
  id: string;
  nameVi: string;
  nameEn: string;
  category: MutationCategory;
  diet: "all" | "carnivore" | "herbivore" | "omnivore";
  slot: 1 | 2 | 3 | "any";
  descVi: string;
  descEn: string;
  unlockConditionVi?: string;
  unlockConditionEn?: string;
  isHarmful?: boolean;
}

export const MUTATIONS: Mutation[] = [
  { id: "reinforced_tendons", nameVi: "Gân Cốt Vững Chắc", nameEn: "Reinforced Tendons", category: "lifecycle", diet: "all", slot: "any", descVi: "Giảm tiêu thụ stamina khi nhảy.", descEn: "Reduces stamina cost for jumping." },
  { id: "multichambered_lungs", nameVi: "Phổi Đa Buồng", nameEn: "Multichambered Lungs", category: "lifecycle", diet: "all", slot: "any", descVi: "Cải thiện ngưỡng hồi phục stamina.", descEn: "Better stamina regeneration threshold." },
  { id: "reniculate_kidneys", nameVi: "Thận Lọc Muối", nameEn: "Reniculate Kidneys", category: "lifecycle", diet: "all", slot: "any", descVi: "Uống nước mặn mà không bị bệnh.", descEn: "Drink saltwater without getting sick." },
  { id: "enhanced_digestion", nameVi: "Tiêu Hoá Nâng Cao", nameEn: "Enhanced Digestion", category: "lifecycle", diet: "all", slot: "any", descVi: "Thức ăn duy trì lâu hơn, giảm tốc độ hao đói.", descEn: "Food lasts longer, slower hunger drain." },
  { id: "night_vision", nameVi: "Thị Giác Đêm", nameEn: "Night Vision", category: "lifecycle", diet: "all", slot: "any", descVi: "Nhìn tốt hơn trong bóng tối.", descEn: "Better vision in darkness." },
  { id: "thick_hide", nameVi: "Da Dày", nameEn: "Thick Hide", category: "lifecycle", diet: "all", slot: "any", descVi: "Giảm sát thương nhận từ loài lớn hơn.", descEn: "Reduces damage taken from larger species." },
  { id: "iron_gut", nameVi: "Dạ Dày Sắt", nameEn: "Iron Gut", category: "lifecycle", diet: "carnivore", slot: "any", descVi: "Ăn xác thối mà không bị ngộ độc.", descEn: "Eat rotting carcasses without getting sick." },
  { id: "efficient_metabolism", nameVi: "Trao Đổi Chất Hiệu Quả", nameEn: "Efficient Metabolism", category: "lifecycle", diet: "all", slot: "any", descVi: "Tốc độ hao đói và khát chậm hơn.", descEn: "Slower hunger and thirst drain rate." },
  { id: "strong_swimmer", nameVi: "Bơi Lội Giỏi", nameEn: "Strong Swimmer", category: "lifecycle", diet: "all", slot: "any", descVi: "Tăng tốc độ và sức bền khi bơi.", descEn: "Increased swim speed and endurance." },
  { id: "keen_senses", nameVi: "Giác Quan Nhạy Bén", nameEn: "Keen Senses", category: "lifecycle", diet: "all", slot: "any", descVi: "Phát hiện kẻ thù từ xa hơn.", descEn: "Detect enemies from further away." },
  { id: "ambush_predator", nameVi: "Kẻ Phục Kích", nameEn: "Ambush Predator", category: "slot2", diet: "carnivore", slot: 2, descVi: "Tăng sát thương đòn đánh đầu tiên khi mục tiêu không hay biết.", descEn: "Bonus damage on first strike vs unaware targets." },
  { id: "pack_instinct", nameVi: "Bản Năng Bầy Đàn", nameEn: "Pack Instinct", category: "slot2", diet: "all", slot: 2, descVi: "Buff nhỏ khi ở gần đồng loại trong bầy.", descEn: "Small buff when near packmates." },
  { id: "cannibal", nameVi: "Ăn Thịt Đồng Loại", nameEn: "Cannibal", category: "unlockable", diet: "carnivore", slot: "any", descVi: "Nhận buff sau khi ăn thịt đồng loại.", descEn: "Gain a buff after cannibalizing your own species.", unlockConditionVi: "Ăn thịt cùng loài ít nhất 1 lần.", unlockConditionEn: "Cannibalize the same species at least once." },
  { id: "bone_breaker", nameVi: "Gãy Xương", nameEn: "Bone Breaker", category: "unlockable", diet: "carnivore", slot: "any", descVi: "Tăng sát thương lên mục tiêu bị thương.", descEn: "Increased damage against already-injured targets.", unlockConditionVi: "Hạ gục 5 người chơi.", unlockConditionEn: "Kill 5 players." },
  { id: "night_stalker", nameVi: "Kẻ Săn Đêm", nameEn: "Night Stalker", category: "unlockable", diet: "carnivore", slot: "any", descVi: "Tốc độ tăng khi hoạt động ban đêm.", descEn: "Speed bonus when active at night.", unlockConditionVi: "Hạ gục 5 người chơi vào ban đêm.", unlockConditionEn: "Kill 5 players at night." },
  { id: "saltwater_adaptation", nameVi: "Thích Nghi Nước Mặn", nameEn: "Saltwater Adaptation", category: "unlockable", diet: "all", slot: "any", descVi: "Không bị tác hại khi uống nước mặn.", descEn: "No negative effects from drinking saltwater.", unlockConditionVi: "Uống nước mặn cho đến khi hết debuff Thiếu Nước.", unlockConditionEn: "Drink saltwater until Fluid Deficient debuff clears." },
  { id: "high_jumper", nameVi: "Nhảy Cao", nameEn: "High Jumper", category: "unlockable", diet: "all", slot: "any", descVi: "Giảm stamina khi nhảy và tăng chiều cao nhảy.", descEn: "Less stamina cost and higher jump height.", unlockConditionVi: "Nhảy 50 lần trong một phiên chơi.", unlockConditionEn: "Jump 50 times in a single session." },
  { id: "endurance_runner", nameVi: "Chạy Bền", nameEn: "Endurance Runner", category: "unlockable", diet: "all", slot: "any", descVi: "Hồi phục stamina nhanh hơn khi di chuyển chậm.", descEn: "Faster stamina regen while slow-moving.", unlockConditionVi: "Cạn kiệt stamina 6–8 lần bằng cách chạy hoặc bơi.", unlockConditionEn: "Drain 6–8 full stamina bars via sprinting or swimming." },
  { id: "good_diet_bonus", nameVi: "Chế Độ Ăn Tốt", nameEn: "Enhanced Digestion (Lifestyle)", category: "unlockable", diet: "all", slot: "any", descVi: "Dinh dưỡng tồn tại lâu hơn nếu duy trì chế độ ăn hoàn hảo.", descEn: "Nutrition lasts longer with a maintained perfect diet.", unlockConditionVi: "Duy trì Chế Độ Ăn Tốt trong 60% quá trình tăng trưởng.", unlockConditionEn: "Maintain Good Diet for 60% of growth." },
  { id: "brittle_bones", nameVi: "Xương Giòn", nameEn: "Brittle Bones", category: "harmful", diet: "all", slot: "any", descVi: "Nhận thêm sát thương từ va chạm và tấn công.", descEn: "Take extra damage from impacts and attacks.", isHarmful: true },
  { id: "slow_metabolism_bad", nameVi: "Trao Đổi Chất Kém", nameEn: "Sluggish Metabolism", category: "harmful", diet: "all", slot: "any", descVi: "Đói và khát nhanh hơn bình thường.", descEn: "Hunger and thirst deplete faster than normal.", isHarmful: true },
];

export const CATEGORY_LABELS: Record<MutationCategory, { vi: string; en: string; color: string }> = {
  lifecycle:  { vi: "Vòng Đời",     en: "Lifecycle",  color: "#4ade80" },
  slot2:      { vi: "Slot 2",       en: "Slot 2",     color: "#60a5fa" },
  unlockable: { vi: "Cần Mở Khoá", en: "Unlockable", color: "#f59e0b" },
  harmful:    { vi: "Có Hại",      en: "Harmful",    color: "#f87171" },
};

export const DIET_LABELS: Record<string, { vi: string; en: string }> = {
  all:       { vi: "Tất cả",   en: "All"      },
  carnivore: { vi: "Ăn thịt", en: "Carnivore" },
  herbivore: { vi: "Ăn cỏ",  en: "Herbivore" },
  omnivore:  { vi: "Ăn tạp", en: "Omnivore"  },
};
