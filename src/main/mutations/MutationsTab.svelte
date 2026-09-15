<script lang="ts">
  import { locale } from "$lib/i18n";
  import { MUTATIONS, CATEGORY_LABELS, DIET_LABELS, type MutationCategory } from "$lib/data/mutations";

  let searchText = $state("");
  let filterCategory = $state<MutationCategory | "all">("all");
  let filterDiet = $state("all");
  let selectedMutation = $state<typeof MUTATIONS[0] | null>(null);

  const isVi = $derived($locale === "vi");

  const filtered = $derived(
    MUTATIONS.filter((m) => {
      const name = isVi ? m.nameVi : m.nameEn;
      const matchQ = searchText.trim() === "" || name.toLowerCase().includes(searchText.toLowerCase());
      const matchC = filterCategory === "all" || m.category === filterCategory;
      const matchD = filterDiet === "all" || m.diet === "all" || m.diet === filterDiet;
      return matchQ && matchC && matchD;
    })
  );
</script>

<div class="mutations-wrap">
  <!-- HEADER -->
  <div class="mut-header">
    <h2>🧬 Mutations</h2>
    <p>{isVi ? "Tra cứu toàn bộ mutation trong The Isle: Evrima" : "Full mutation reference for The Isle: Evrima"}</p>
  </div>

  <!-- BỘ LỌC -->
  <div class="mut-filters">
    <input
      class="mut-search"
      type="text"
      bind:value={searchText}
      placeholder={isVi ? "🔍 Tìm tên mutation…" : "🔍 Search mutation…"}
    />
    <select bind:value={filterCategory} class="mut-select">
      <option value="all">{isVi ? "Tất cả loại" : "All Categories"}</option>
      {#each Object.entries(CATEGORY_LABELS) as [key, label]}
        <option value={key}>{isVi ? label.vi : label.en}</option>
      {/each}
    </select>
    <select bind:value={filterDiet} class="mut-select">
      {#each Object.entries(DIET_LABELS) as [key, label]}
        <option value={key}>{isVi ? label.vi : label.en}</option>
      {/each}
    </select>
  </div>

  <!-- STATS -->
  <div class="mut-stats">
    <span>{isVi ? "Hiển thị" : "Showing"} <strong>{filtered.length}</strong> / {MUTATIONS.length}</span>
    {#each Object.entries(CATEGORY_LABELS) as [key, label]}
      <span class="mut-badge" style="color:{label.color};border-color:{label.color}">
        {isVi ? label.vi : label.en}: {MUTATIONS.filter((m) => m.category === key).length}
      </span>
    {/each}
  </div>

  <!-- GRID -->
  <div class="mut-grid">
    {#if filtered.length === 0}
      <p class="mut-empty">{isVi ? "Không tìm thấy mutation nào." : "No mutations found."}</p>
    {/if}
    {#each filtered as m (m.id)}
      <button
        class="mut-card"
        class:harmful={m.isHarmful}
        style="--cat:{CATEGORY_LABELS[m.category].color}"
        onclick={() => (selectedMutation = m)}
      >
        <span class="mut-cat" style="color:{CATEGORY_LABELS[m.category].color};background:{CATEGORY_LABELS[m.category].color}20">
          {isVi ? CATEGORY_LABELS[m.category].vi : CATEGORY_LABELS[m.category].en}
        </span>
        <div class="mut-name">
          {#if m.isHarmful}<span>⚠️</span>{/if}
          {isVi ? m.nameVi : m.nameEn}
        </div>
        <div class="mut-name-alt">{isVi ? m.nameEn : m.nameVi}</div>
        <p class="mut-desc">{isVi ? m.descVi : m.descEn}</p>
        <span class="mut-diet">{isVi ? DIET_LABELS[m.diet].vi : DIET_LABELS[m.diet].en}</span>
        {#if m.unlockConditionVi}
          <div class="mut-unlock">🔓 {isVi ? m.unlockConditionVi : m.unlockConditionEn}</div>
        {/if}
      </button>
    {/each}
  </div>
</div>

<!-- MODAL -->
{#if selectedMutation}
  <div class="mut-overlay" role="button" tabindex="0" onclick={() => (selectedMutation = null)} onkeydown={(e) => e.key === "Escape" && (selectedMutation = null)}>
    <div class="mut-modal" role="dialog" onclick={(e) => e.stopPropagation()} onkeydown={() => {}}>
      <button class="mut-close" onclick={() => (selectedMutation = null)}>✕</button>
      <span class="mut-cat" style="color:{CATEGORY_LABELS[selectedMutation.category].color};background:{CATEGORY_LABELS[selectedMutation.category].color}20">
        {isVi ? CATEGORY_LABELS[selectedMutation.category].vi : CATEGORY_LABELS[selectedMutation.category].en}
      </span>
      <h3>{isVi ? selectedMutation.nameVi : selectedMutation.nameEn}</h3>
      <p class="mut-name-alt">{isVi ? selectedMutation.nameEn : selectedMutation.nameVi}</p>
      <div class="mut-row">
        <span class="mut-label">{isVi ? "Chế độ ăn" : "Diet"}</span>
        <span>{isVi ? DIET_LABELS[selectedMutation.diet].vi : DIET_LABELS[selectedMutation.diet].en}</span>
      </div>
      {#if selectedMutation.slot !== "any"}
        <div class="mut-row">
          <span class="mut-label">Slot</span>
          <span>{selectedMutation.slot}</span>
        </div>
      {/if}
      <div class="mut-modal-desc">{isVi ? selectedMutation.descVi : selectedMutation.descEn}</div>
      {#if selectedMutation.unlockConditionVi}
        <div class="mut-modal-unlock">
          <strong>🔓 {isVi ? "Cách mở khoá" : "How to Unlock"}</strong>
          <p>{isVi ? selectedMutation.unlockConditionVi : selectedMutation.unlockConditionEn}</p>
        </div>
      {/if}
      {#if selectedMutation.isHarmful}
        <div class="mut-modal-harmful">⚠️ {isVi ? "Đây là mutation CÓ HẠI!" : "This is a HARMFUL mutation!"}</div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .mutations-wrap { display:flex; flex-direction:column; gap:12px; padding:16px; height:100%; overflow-y:auto; color:#e5e7eb; }
  .mut-header h2 { margin:0 0 4px; font-size:1.3rem; color:#f9fafb; }
  .mut-header p { margin:0; font-size:0.8rem; color:#9ca3af; }
  .mut-filters { display:flex; gap:8px; flex-wrap:wrap; }
  .mut-search, .mut-select { background:#1f2937; border:1px solid #374151; border-radius:6px; color:#e5e7eb; padding:6px 10px; font-size:0.82rem; outline:none; }
  .mut-search { flex:1; min-width:160px; }
  .mut-search:focus, .mut-select:focus { border-color:#4ade80; }
  .mut-stats { display:flex; gap:8px; flex-wrap:wrap; align-items:center; font-size:0.78rem; color:#9ca3af; }
  .mut-badge { border:1px solid; border-radius:99px; padding:2px 8px; font-size:0.73rem; }
  .mut-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:10px; }
  .mut-empty { color:#6b7280; grid-column:1/-1; text-align:center; padding:32px 0; }
  .mut-card { background:#111827; border:1px solid #1f2937; border-left:3px solid var(--cat,#4ade80); border-radius:8px; padding:10px 12px; cursor:pointer; display:flex; flex-direction:column; gap:5px; text-align:left; transition:background 0.15s; }
  .mut-card:hover { background:#1f2937; }
  .mut-card.harmful { border-left-color:#f87171; }
  .mut-cat { display:inline-block; font-size:0.68rem; font-weight:600; padding:2px 7px; border-radius:99px; width:fit-content; text-transform:uppercase; letter-spacing:0.04em; }
  .mut-name { font-size:0.92rem; font-weight:700; color:#f3f4f6; }
  .mut-name-alt { font-size:0.72rem; color:#6b7280; }
  .mut-desc { font-size:0.8rem; color:#d1d5db; margin:0; line-height:1.4; }
  .mut-diet { font-size:0.68rem; color:#6b7280; border:1px solid #374151; border-radius:4px; padding:1px 5px; width:fit-content; }
  .mut-unlock { font-size:0.72rem; color:#fbbf24; background:#78350f20; border-radius:4px; padding:4px 7px; }
  .mut-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.65); display:flex; align-items:center; justify-content:center; z-index:9999; }
  .mut-modal { background:#111827; border:1px solid #374151; border-radius:12px; padding:24px; max-width:400px; width:90%; position:relative; display:flex; flex-direction:column; gap:10px; }
  .mut-close { position:absolute; top:12px; right:12px; background:none; border:none; color:#9ca3af; font-size:1rem; cursor:pointer; }
  .mut-close:hover { color:#f3f4f6; }
  .mut-modal h3 { margin:0; font-size:1.15rem; color:#f9fafb; }
  .mut-row { display:flex; gap:8px; font-size:0.82rem; align-items:center; }
  .mut-label { color:#9ca3af; font-weight:600; min-width:90px; }
  .mut-modal-desc { background:#1f2937; border-radius:6px; padding:10px 12px; font-size:0.85rem; color:#d1d5db; }
  .mut-modal-unlock { background:#78350f20; border:1px solid #f59e0b40; border-radius:6px; padding:8px 12px; font-size:0.8rem; color:#fbbf24; }
  .mut-modal-unlock p { margin:4px 0 0; }
  .mut-modal-harmful { background:#7f1d1d40; border:1px solid #f8717140; border-radius:6px; padding:8px 12px; font-size:0.82rem; color:#f87171; font-weight:600; }
</style>
