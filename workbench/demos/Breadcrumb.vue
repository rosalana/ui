<script setup lang="ts">
import UiBreadcrumb from "../../src/components/Ui/Breadcrumb/Breadcrumb.vue";
import UiBreadcrumbList from "../../src/components/Ui/Breadcrumb/BreadcrumbList.vue";
import UiBreadcrumbItem from "../../src/components/Ui/Breadcrumb/BreadcrumbItem.vue";
import UiBreadcrumbLink from "../../src/components/Ui/Breadcrumb/BreadcrumbLink.vue";
import UiBreadcrumbPage from "../../src/components/Ui/Breadcrumb/BreadcrumbPage.vue";
import UiBreadcrumbSeparator from "../../src/components/Ui/Breadcrumb/BreadcrumbSeparator.vue";
import UiBreadcrumbEllipsis from "../../src/components/Ui/Breadcrumb/BreadcrumbEllipsis.vue";
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <UiBreadcrumb>
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="#">Home</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="#">Projects</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbPage>Design System</UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Ellipsis</h2>
      <UiBreadcrumb>
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="#">Home</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbEllipsis />
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="#">Components</UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbPage>Breadcrumb</UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Deep Path</h2>
      <UiBreadcrumb>
        <UiBreadcrumbList>
          <UiBreadcrumbItem><UiBreadcrumbLink href="#">Dashboard</UiBreadcrumbLink></UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem><UiBreadcrumbLink href="#">Settings</UiBreadcrumbLink></UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem><UiBreadcrumbLink href="#">Team</UiBreadcrumbLink></UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem><UiBreadcrumbPage>Members</UiBreadcrumbPage></UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>
    </section>
  </div>
</template>
