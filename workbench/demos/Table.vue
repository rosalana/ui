<script setup lang="ts">
import UiTable from "../../src/components/Ui/Table/Table.vue";
import UiTableHeader from "../../src/components/Ui/Table/TableHeader.vue";
import UiTableBody from "../../src/components/Ui/Table/TableBody.vue";
import UiTableRow from "../../src/components/Ui/Table/TableRow.vue";
import UiTableHead from "../../src/components/Ui/Table/TableHead.vue";
import UiTableCell from "../../src/components/Ui/Table/TableCell.vue";
import UiTableCaption from "../../src/components/Ui/Table/TableCaption.vue";
import UiTableFooter from "../../src/components/Ui/Table/TableFooter.vue";
import UiBadge from "../../src/components/Ui/Badge/Badge.vue";
import Section from "workbench/components/Section.vue";

const invoices = [
  {
    id: "INV-001",
    client: "Acme Corp",
    amount: 1250.0,
    status: "paid",
    date: "2026-04-01",
  },
  {
    id: "INV-002",
    client: "Globex Inc",
    amount: 750.5,
    status: "pending",
    date: "2026-04-08",
  },
  {
    id: "INV-003",
    client: "Initech",
    amount: 3200.0,
    status: "overdue",
    date: "2026-03-15",
  },
  {
    id: "INV-004",
    client: "Umbrella Ltd",
    amount: 480.0,
    status: "paid",
    date: "2026-04-12",
  },
  {
    id: "INV-005",
    client: "Stark Industries",
    amount: 9800.0,
    status: "pending",
    date: "2026-04-18",
  },
];

const total = invoices.reduce((sum, i) => sum + i.amount, 0);

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  paid: "default",
  pending: "secondary",
  overdue: "destructive",
};
</script>

<template>
  <Section title="Invoices" class="max-w-2xl">
    <div
      class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden"
    >
      <UiTable>
        <UiTableCaption>Recent invoices — May 2026</UiTableCaption>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Invoice</UiTableHead>
            <UiTableHead>Client</UiTableHead>
            <UiTableHead>Date</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Amount</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="inv in invoices" :key="inv.id">
            <UiTableCell class="font-medium">{{ inv.id }}</UiTableCell>
            <UiTableCell>{{ inv.client }}</UiTableCell>
            <UiTableCell class="text-theme">{{ inv.date }}</UiTableCell>
            <UiTableCell>
              <UiBadge :variant="statusVariant[inv.status]" class="capitalize">
                {{ inv.status }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell class="text-right font-medium"
              >${{ inv.amount.toFixed(2) }}</UiTableCell
            >
          </UiTableRow>
        </UiTableBody>
        <UiTableFooter>
          <UiTableRow>
            <UiTableCell colspan="4" class="font-semibold">Total</UiTableCell>
            <UiTableCell class="text-right font-semibold"
              >${{ total.toFixed(2) }}</UiTableCell
            >
          </UiTableRow>
        </UiTableFooter>
      </UiTable>
    </div>
  </Section>

  <Section title="Simple" class="max-w-2xl">
    <div
      class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden"
    >
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Name</UiTableHead>
            <UiTableHead>Role</UiTableHead>
            <UiTableHead>Department</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow
            v-for="user in [
              { name: 'Alice Johnson', role: 'Designer', dept: 'Product' },
              { name: 'Bob Smith', role: 'Engineer', dept: 'Engineering' },
              { name: 'Carol White', role: 'Manager', dept: 'Operations' },
            ]"
            :key="user.name"
          >
            <UiTableCell class="font-medium">{{ user.name }}</UiTableCell>
            <UiTableCell>{{ user.role }}</UiTableCell>
            <UiTableCell class="text-theme">{{ user.dept }}</UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </Section>
</template>
