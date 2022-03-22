<template>
  <div class="section-container pt-16">
    <section-header>
      <template #title>
        {{ data.section.sectionTitle }}
      </template>
      <template #description>
        {{ data.section.sectionDescription }}
      </template>
    </section-header>
    <news-list :data="data.news"></news-list>
  </div>
</template>

<script>
import SectionHeader from '@/components/frontend/SectionHeader.vue'
import NewsList from '@/components/frontend/NewsList.vue'

export default {
  components: { SectionHeader, NewsList },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
  }
</script>


