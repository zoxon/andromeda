---
to: "src/pages/<%= h.inflection.dasherize(name.toLowerCase()) %>.astro"
---
---
import DefaultLayout from '@/layouts/Default.astro'
import Container from '@/components/base/Container.astro'
---

<DefaultLayout title="Page title">
  <main class="flex-1">
    <Container>Content</Container>
  </main>
</DefaultLayout>

