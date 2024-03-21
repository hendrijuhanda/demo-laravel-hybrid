<script lang="ts" setup>
import { getTransactionsRequest } from '@/utils/api-client';
import priceFormat from '@/utils/price-format';
import { Button, InputSearch, Table, notification } from 'ant-design-vue';
import { TableProps } from 'ant-design-vue/es/table';
import { DateTime } from 'luxon';
import { onMounted, ref } from 'vue';

const columns = [
    {
        title: 'Datetime',
        dataIndex: 'datetime',
    },
    {
        title: 'Transaction ID',
        dataIndex: 'trx_id',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        filters: [
            {
                text: 'Transaction',
                value: 'transaction',
            },
            {
                text: 'Topup',
                value: 'topup',
            }
        ],
        filterMultiple: false,
    },
    {
        title: 'Amount (Rp.)',
        dataIndex: 'amount',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Balance (Rp.)',
        dataIndex: 'balance',
    },
];

const dataSource = ref<any[]>([]);
const paginationSource = ref<any>({
    total: 0,
    current: 0,
    pageSize: 0,
});

const searchTrxId = ref<string>('');
const searchDescription = ref<string>('');
const typeFilter = ref<string>('');
const isFetching = ref<boolean>(false);

const fetchData = async (params: any = { page: 1, per_page: 10 }) => {
    isFetching.value = true

    const res = await getTransactionsRequest({
        transaction_id: searchTrxId.value || undefined,
        description: searchDescription.value || undefined,
        type: typeFilter.value || undefined, ...params
    }).catch(e => {
        notification.error({
            message: e?.message
        })
    })

    if (res) {
        const { data } = res;
        const { items, pagination } = data.data;

        dataSource.value = items.map((item: any) => ({
            datetime: item.transaction_time,
            trx_id: item.transaction_id,
            type: item.type,
            amount: item.amount,
            description: item.description,
            balance: item.balance
        }));

        paginationSource.value = {
            ...pagination.value,
            total: pagination.total,
            current: pagination.current_page,
            pageSize: pagination.per_page
        }
    }

    isFetching.value = false
}

const handleTableChange: TableProps['onChange'] = (pagination: any, filters: any) => {
    if (filters.type) {
        typeFilter.value = filters.type[0];
    }
    else {
        typeFilter.value = ''
    }

    fetchData({
        page: pagination.current,
        per_page: pagination.pageSize,
        type: filters.type ? filters.type[0] : undefined
    });
};

const handleSearch = () => {
    fetchData({
        page: 1,
        per_page: paginationSource.value.pageSize,
    });
}

const handleSearchReset = () => {
    searchTrxId.value = ''
    searchDescription.value = ''

    fetchData({
        page: 1,
        per_page: paginationSource.value.pageSize,
    });
}

onMounted(() => {
    fetchData();
})
</script>

<template>
<div>
    <div class="tw-flex tw-items-center tw-justify-end tw-mb-8">
        <div class="tw-mr-4">
            <InputSearch v-model:value="searchTrxId" placeholder="Search transaction ID" @search="handleSearch" />
        </div>

        <div class="tw-mr-4">
            <InputSearch v-model:value="searchDescription" placeholder="Search description" @search="handleSearch" />
        </div>

        <div>
            <Button @click="handleSearchReset">Reset</Button>
        </div>
    </div>

    <Table :data-source="dataSource" :columns="columns" :loading="isFetching" :pagination="paginationSource"
        @change="handleTableChange">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'datetime'">
                <div>{{ DateTime.fromISO(record.datetime).toFormat('d LLLL yyyy HH:mm') }}</div>
            </template>

            <template v-if="column.dataIndex === 'amount'">
                <div class="tw-text-right">
                    <template v-if="record.type === 'transaction'">({{ priceFormat(record.amount) }})</template>
                    <template v-else>{{ priceFormat(record.amount) }}</template>
                </div>
            </template>

            <template v-if="column.dataIndex === 'balance'">
                <div class="tw-text-right">
                    {{ priceFormat(record.balance) }}
                </div>
            </template>
        </template>
    </Table>
</div>
</template>
