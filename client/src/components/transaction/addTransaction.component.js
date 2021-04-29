import {Fragment, useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

import TransactionContext from '../../context/transaction/TransactionContext';
import CustomerContext from '../../context/customer/CustomerContext';
import ProductContext from '../../context/product/ProductContext';
import AuthContext from '../../context/auth/AuthContext'; 

const AddTransaction = () => {
  const authContext = useContext(AuthContext);
  const transactionContext = useContext(TransactionContext);
  const customerContext = useContext(CustomerContext);
  const productContext = useContext(ProductContext);

  const { createTransaction, searchTransaction, data } = transactionContext;
  const { getCustomers, customers } = customerContext;
  const { getProducts, products } = productContext;
  const { loadUser, user} = authContext;

  const [Reporting_Date, setReporting_date] = useState("");
  const [Field_Staff_Name, setField_Staff_Name] = useState("");
  const [Customer_Name, setCustomer_Name] = useState("");
  const [Loading, setLoading] = useState(0);
  const [Opening_balance, setOpening_balance] = useState(0);
  const [Product_Name, setProduct_Name] = useState("");
  const [Release_, setRelease_] = useState(0);
  let Release_balance = Release_ - Loading;
//   Release_balance = _Release_balance - Loading;
  const [setRelease_balance] = useState(Release_balance);
  const [Take_on, setTake_on] = useState(0);
  let Closing_balance = Number.parseInt(Opening_balance) + Number.parseInt(Take_on) - Release_;
  const [setClosing_balance] = useState(Closing_balance);
  let Physical_Stock_Balance = Number.parseInt(Opening_balance) + Number.parseInt(Take_on) - Loading;
  const [setPhysical_Stock_Balance] = useState(Physical_Stock_Balance);
  const [Approval_1] = useState("");
  const [Approval_2] = useState("");
  const [Approval_3] = useState("");

  let role = user && user.data.role;

  useEffect(() => {
      loadUser();
      getCustomers();
      getProducts();
        if(data) {
            setOpening_balance(data.Closing_balance);
            setRelease_(data.Release_balance);
            // setLoading(data.Loading);
        }
    //eslint-disable-next-line
  },[data])

  const onBlur = () => {
    if(Customer_Name !== "" && Product_Name !== "") 
        searchTransaction({ Customer_Name, Product_Name });
  }

  const onSubmit = (e) => {
      e.preventDefault();
      createTransaction({
          UserId: user && user.data.id,
          Reporting_Date,
          Field_Staff_Name,
          State: user && user.data.state,
          Closing_balance,
          Customer_Name,
          Loading,
          Opening_balance,
          Physical_Stock_Balance,
          Product_Name,
          Release_,
          Release_balance,
          Take_on,
          Approval_1,
          Approval_2,
          Approval_3,
          setReporting_date,
          setField_Staff_Name,
          setCustomer_Name,
          setLoading,
          setOpening_balance,
          setProduct_Name,
          setRelease_,
          setTake_on
      })
  }

   return(
       <Fragment>

            <div className="content container">
                <div className="page-header">
                    <div className="row align-items-center mb-3">
                        <div className="col-sm mb-2 mb-sm-0">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-no-gutter">
                                <li className="breadcrumb-item"><Link className="breadcrumb-link" to="/">Transactions</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Add Transaction</li>
                                </ol>
                            </nav>
                            <h1 className="page-header-title">Add Transaction</h1>
                        </div>
                        {/* {role !== "staff" &&
                            <div className="col-sm-auto">
                                <span className="btn btn-primary" data-toggle="modal" data-target="#addCustomersModal">Add Customer</span>
                                <span className="btn btn-primary ml-3" data-toggle="modal" data-target="#addProductsModal">Add Product</span>
                            </div>
                        } */}
                       
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">  
                        <div className="card mb-3 mb-lg-5">
                            <div className="card-header">
                                <h4 className="card-header-title">Transaction information</h4>
                            </div>
                            <form onSubmit={onSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col">
                                            <label className="input-label">Customer Name</label>
                                            <select 
                                                value={Customer_Name} 
                                                onChange={(e) => setCustomer_Name(e.target.value)} 
                                                className="js-select2-custom custom-select" 
                                                name="Customer_Name"
                                                required
                                                >
                                                <option label="Select Customer"></option>
                                                {customers.map(x => (
                                                    <option key={x.id} value={x.Customer_Name}>{x.Customer_Name}</option>
                                                ))}
                                            </select>
                                    </div>
                                    <div className="form-group col">
                                            <label className="input-label">Product Name</label>
                                            <select 
                                                  value={Product_Name} 
                                                  onChange={(e) => setProduct_Name(e.target.value)} 
                                                  className="js-select2-custom custom-select" 
                                                  name="Product_Name"
                                                  required
                                                  onBlur={onBlur}
                                            >
                                                <option label="Select Product"></option>
                                                {products.map(x => (
                                                    <option key={x.id} value={x.Product_Name}>{x.Product_Name}</option>
                                                ))}
                                                
                                            </select>
                                        </div>

                                </div>
                                    <div className="form-group">
                                        <label htmlFor="nameModalEgLabel" className="input-label">Reporting Date</label>
                                        <input 
                                            type="date" 
                                            className="js-flatpickr form-control flatpickr-custom w-100" 
                                            name="Reporting_Date"
                                            value={Reporting_Date}
                                            onChange={(e) => setReporting_date(e.target.value)}
                                            required
                                            />
                                    </div>
                                  
                                    <div className="form-group">
                                            <label className="input-label">Field Staff Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                 name="Field_Staff_Name" 
                                                 placeholder="Please enter your name." 
                                                 aria-label="3000" 
                                                 required data-msg="Please enter your name."
                                                 value={Field_Staff_Name}
                                                 onChange={(e) => setField_Staff_Name(e.target.value)}
                                                 />
                                        </div>

                                    <div className="row">
                                        <div className="form-group col">
                                            <label htmlFor="nameModalEgLabel" className="input-label">Opening Balance</label>
                                            <div className="js-form-message">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="Opening_Balance" 
                                                placeholder="eg. 3000" 
                                                aria-label="3000" 
                                                required data-msg="Please enter your name."
                                                value={Opening_balance}
                                                onChange={(e) => setOpening_balance(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col">
                                            <label htmlFor="nameModalEgLabel" className="input-label">Take On</label>
                                            <div className="js-form-message">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="Take_on" 
                                                placeholder="eg. 2000" aria-label="3000" 
                                                required data-msg="Please enter your name."
                                                value={Take_on}
                                                onChange={(e) => setTake_on(e.target.value)}
                                                />
                                            </div>
                                        </div>   
                                    </div>
                                    <div className="row">
                                        <div className="form-group col">
                                            <label htmlFor="nameModalEgLabel" className="input-label">Release</label>
                                            <div className="js-form-message">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="Release_" placeholder="eg. 160" 
                                                aria-label="3000" required data-msg="Please enter your name."
                                                value={Release_}
                                                onChange={(e) => setRelease_(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col">
                                            <label htmlFor="nameModalEgLabel" className="input-label">Loading</label>
                                            <div className="js-form-message">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="Loading" placeholder="eg. 150" aria-label="3000"
                                                 required data-msg="Please enter your name."
                                                 value={Loading}
                                                 onChange={(e) => setLoading(e.target.value)}
                                                 />
                                            </div>
                                        </div>   
                                    </div>
                                    <div className="row">
                                        <div className="form-group col">
                                            <label htmlFor="nameModalEgLabel" className="input-label">Closing Balance</label>
                                            <div className="js-form-message">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="Closing_balance" 
                                                placeholder="eg. 160" aria-label="3000" 
                                                required data-msg="Please enter your name."
                                                value={Closing_balance}
                                                onChange={(e) => setClosing_balance(e.target.value)}
                                                disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col">
                                            <label htmlFor="nameModalEgLabel" className="input-label">Release Balance</label>
                                            <div className="js-form-message">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="Release_balance" 
                                                placeholder="eg. 150" 
                                                aria-label="3000" 
                                                required data-msg="Please enter your name."
                                                value={Release_balance}
                                                onChange={(e) => setRelease_balance(e.target.value)}
                                                disabled
                                                />
                                            </div>
                                        </div>   
                                    </div>
                                    <div className="form-group">
                                            <label htmlFor="nameModalEgLabel" className="input-label">Physical Stock Balance</label>
                                            <div className="js-form-message">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="Physical_Stock_Balance" placeholder="eg. 150" 
                                                aria-label="3000" 
                                                required data-msg="Please enter your name."
                                                value={Physical_Stock_Balance}
                                                onChange={(e) => setPhysical_Stock_Balance(e.target.value)}
                                                disabled
                                                />
                                            </div>
                                        </div>   
            
                            </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-end">
                                        <Link to="/"  className="btn btn-white mr-2">Discard</Link>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <AddCustomerModal />
            <AddProductModal /> */}
       </Fragment>
    )
}

export default AddTransaction