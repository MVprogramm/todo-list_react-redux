TASK: filterable list of goods by category

{

  components.map:
  {
    index.jsx <- FilterableProductTable.jsx <-- ProductTable.jsx <-- ProductCategoryRow.jsx <-- ProductRow.jsx
                                            |
                                            <-- SearchBar.jsx
  }

  components.data-flow:
  {
    FilterableProductTable.jsx:
    {
      props: -
      state: filterText, checkboxValue
      render: app
    }
    ProductTable.jsx:
    {
      props: filterText, checkboxValue, handleChange
      state: products
      render: product Table
    }
    SearchBar.jsx:
    {
      props: filterText, checkboxValue, handleChange
      state: -
      render: search bar, checkbox
    }
    ProductRow.jsx:
    {
      props: product
      state: -
      render: product row
    }
    ProductCategoryRow.jsx:
    {
      props: product category
      state: -
      render: product category
    }
  }
}





