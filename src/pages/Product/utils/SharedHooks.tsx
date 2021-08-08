import React from 'react'
import { useTranslation } from 'react-i18next'
import { ProductListDataArray } from '../services/getProductList/model'
import { ReactComponent as Info } from 'src/assets/icon/info.svg'

// const textList = [{label:'鏡片修改說明',link:'/abc'}]

export const useProductHeadandBody = (type_no?: string) => {
  const { t } = useTranslation()
  const productType = type_no === 'productType' ? 'productType' : type_no ? type_no[0] : ''

  const getHeadandBody = (list?: ProductListDataArray & { type_name: string; is_show: string }) => {
    const dragIcon = {
      id: '',
      sort: '',
      label: '',
      width: 'calc(100% * (20 / 914))',
      disabledSort: true,
      content: '',
    }
    const productName = {
      id: 'name',
      sort: 'product_info__product_name',
      label: t('product.glassesTableHeadName'),
      width: 'calc(100% * (162 / 914))',
      disabledSort: true,
      content: list && list.product_name,
    }

    const area = {
      id: 'area',
      sort: 'country_type',
      label: t('area.area'),
      width: 'calc(100% * (140 / 914))',
      disabledSort: true,
      content: list && list.country_type === '1' ? t('select.national') : t('select.international'),
    }

    const brand = {
      id: 'brand',
      sort: 'brand_code',
      label: t('product.glassesTableHeadBrand'),
      width: 'calc(100% * (140 / 914))',
      disabledSort: true,
      content: list && list.brand_name,
    }

    const promote = {
      id: 'promote',
      sort: '',
      label: t('product.glassesTableHeadPromote'),
      width: 'calc(100% * (140 / 914))',
      disabledSort: true,
      content:
        list &&
        (list.market_type === '0' ? t('product.marketType0') : list.market_type === '1' ? t('product.marketType1') : t('product.marketType2')),
    }

    const status = {
      id: 'status',
      sort: 'status',
      label: t('company.openFlag'),
      width: 'calc(100% * (140 / 914))',
      disabledSort: true,
      content: list && (list.status === '0' ? t('product.status0') : list.status === '1' ? t('product.status1') : t('product.status2')),
    }

    switch (productType) {
      case 'productType':
        return [
          dragIcon,
          {
            id: 'name',
            sort: 'product_type__product_name',
            label: t('product.productTypeHeader'),
            width: '100%',
            disabledSort: true,
            content: list && (
              <>
                {list.type_name}{' '}
                {list.is_show === '0' && (
                  <span>
                    <Info />
                    {t('product.productTypeNotShow')}
                  </span>
                )}
              </>
            ),
          },
        ]
      case 'O':
      case 'R':
      case 'S':
      case 'M':
      case 'H':
        return [
          dragIcon,
          productName,
          area,
          brand,
          promote,
          {
            id: 'simulate',
            sort: '',
            label: t('product.glassesTableHeadSimulate'),
            width: 'calc(100% * (140 / 914))',
            disabledSort: true,
            content: list && list.is_simulation === '0' ? t('product.isSimulation0') : t('product.isSimulation1'),
          },
          status,
        ]
      case 'C':
        return [dragIcon, { ...productName, width: 'calc(100% * (318 / 914))' }, area, brand, promote, status]
      case 'A':
        return [dragIcon, { ...productName, width: 'calc(100% * (318 / 914))' }, area, brand, promote, status]
      case 'K':
        return [
          { ...productName, width: 'calc(100% * (318 / 914))', disabledSort: false },
          { ...area, disabledSort: false },
          { ...brand, disabledSort: false },
          { ...status, disabledSort: false },
        ]
      default:
        return []
    }
  }

  return { getHeadandBody }
}

export const useAreaRadio = () => {
  const { t } = useTranslation()
  const areaRadios = [
    {
      label: t('select.national'),
      value: '1',
    },
    {
      label: t('select.international'),
      value: '2',
    },
  ]
  return { areaRadios }
}

export const useStatusRadio = () => {
  const { t } = useTranslation()
  const statusRadios = [
    {
      label: t('product.status1'),
      value: '1',
    },
    {
      label: t('product.status2'),
      value: '2',
    },
  ]
  return { statusRadios }
}

export const usePromoteRadio = () => {
  const { t } = useTranslation()
  const promoteRadios = [
    {
      label: t('product.marketType0'),
      value: '0',
    },
    {
      label: t('product.marketType1'),
      value: '1',
    },
    {
      label: t('product.marketType2'),
      value: '2',
    },
  ]
  return { promoteRadios }
}
