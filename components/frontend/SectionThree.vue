<template>
  <div class="section-container pt-16">
    <section-header>
      <template #title>
        {{ data.section.sectionTitle }}
      </template>
    </section-header>
    <tag-list :data="data.tags"></tag-list>
  </div>
</template>

<script>
import SectionHeader from '@/components/frontend/SectionHeader.vue'
import TagList from '@/components/frontend/TagList.vue'

export default {
  components: { SectionHeader, TagList },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
}
</script>
