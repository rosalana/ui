<script setup lang="ts">
import UiResizablePanelGroup from "../../src/components/Ui/Resizable/ResizablePanelGroup.vue";
import UiResizablePanel from "../../src/components/Ui/Resizable/ResizablePanel.vue";
import UiResizableHandle from "../../src/components/Ui/Resizable/ResizableHandle.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
</script>

<template>
  <div class="space-y-10 max-w-2xl">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Horizontal Split</h2>
      <div class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden h-40">
        <UiResizablePanelGroup direction="horizontal">
          <UiResizablePanel :default-size="30" :min-size="20">
            <div class="flex h-full items-center justify-center bg-muted-50 dark:bg-muted-950">
              <div class="text-center">
                <UiIcon name="lucide:sidebar" class="size-5 text-theme mx-auto mb-1" />
                <p class="text-xs text-theme">Sidebar</p>
              </div>
            </div>
          </UiResizablePanel>
          <UiResizableHandle with-handle />
          <UiResizablePanel :default-size="70">
            <div class="flex h-full items-center justify-center">
              <div class="text-center">
                <UiIcon name="lucide:layout" class="size-5 text-theme mx-auto mb-1" />
                <p class="text-xs text-theme">Main Content</p>
              </div>
            </div>
          </UiResizablePanel>
        </UiResizablePanelGroup>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Three Panels</h2>
      <div class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden h-40">
        <UiResizablePanelGroup direction="horizontal">
          <UiResizablePanel :default-size="20" :min-size="15">
            <div class="flex h-full flex-col">
              <div class="px-3 py-2 border-b border-muted-200 dark:border-muted-800 text-xs font-medium">Files</div>
              <div class="flex-1 p-2 space-y-1">
                <div class="text-xs text-theme px-2 py-1 rounded hover:bg-muted-100 dark:hover:bg-muted-900 cursor-pointer">App.vue</div>
                <div class="text-xs text-theme px-2 py-1 rounded bg-primary/10 text-primary">main.ts</div>
                <div class="text-xs text-theme px-2 py-1 rounded hover:bg-muted-100 dark:hover:bg-muted-900 cursor-pointer">index.ts</div>
              </div>
            </div>
          </UiResizablePanel>
          <UiResizableHandle with-handle />
          <UiResizablePanel :default-size="55">
            <div class="h-full flex flex-col">
              <div class="px-3 py-2 border-b border-muted-200 dark:border-muted-800 text-xs font-medium">main.ts</div>
              <div class="flex-1 p-3 font-mono text-xs text-theme leading-relaxed">
                <span class="text-primary">import</span> { createApp } <span class="text-primary">from</span> <span class="text-success">'vue'</span><br/>
                <span class="text-primary">import</span> App <span class="text-primary">from</span> <span class="text-success">'./App.vue'</span><br/>
                <br/>
                createApp(App).mount(<span class="text-success">'#app'</span>)
              </div>
            </div>
          </UiResizablePanel>
          <UiResizableHandle with-handle />
          <UiResizablePanel :default-size="25" :min-size="15">
            <div class="h-full flex flex-col">
              <div class="px-3 py-2 border-b border-muted-200 dark:border-muted-800 text-xs font-medium">Terminal</div>
              <div class="flex-1 p-3 bg-muted-950 font-mono text-xs text-green-400 leading-relaxed">
                <span class="text-muted-600">$</span> npm run dev<br/>
                <span class="text-muted-400">VITE ready on port 5173</span>
              </div>
            </div>
          </UiResizablePanel>
        </UiResizablePanelGroup>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Vertical Split</h2>
      <div class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden h-56">
        <UiResizablePanelGroup direction="vertical">
          <UiResizablePanel :default-size="60" :min-size="30">
            <div class="flex h-full items-center justify-center">
              <div class="text-center">
                <UiIcon name="lucide:monitor" class="size-5 text-theme mx-auto mb-1" />
                <p class="text-xs text-theme">Editor</p>
              </div>
            </div>
          </UiResizablePanel>
          <UiResizableHandle with-handle />
          <UiResizablePanel :default-size="40" :min-size="20">
            <div class="flex h-full items-center justify-center bg-muted-50 dark:bg-muted-950">
              <div class="text-center">
                <UiIcon name="lucide:terminal" class="size-5 text-theme mx-auto mb-1" />
                <p class="text-xs text-theme">Terminal</p>
              </div>
            </div>
          </UiResizablePanel>
        </UiResizablePanelGroup>
      </div>
    </section>
  </div>
</template>
