import React from "react";
import Table from "@/components/modules/table/Table";
import connectToDB from "@/db/db";
import { FaRegEdit } from "react-icons/fa";
import orderModal from "@/model/order";
import OrdersList from "@/components/template/p-admin/orders/ordersList";
import Pagination from "@/components/modules/pagination/pagination";

export default async function Page({ searchParams }) {
  await connectToDB();

  const id = await searchParams.id;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 15;

  let order = null;
  let orders = [];
  let totalCount = 0;

  if (id) {
    order = await orderModal.findById(id).lean();
    if (!order) return <div>Order not found</div>;
  } else {
    let cursor = null;
    if (page > 1) {
      const prevOrders = await orderModal
        .find({})
        .sort({ _id: 1 })
        .limit((page - 1) * limit - 1)
        .select("_id")
        .lean();
      cursor = prevOrders[prevOrders.length - 1]?._id;
    }

    const query = cursor ? { _id: { $gt: cursor } } : {};
    totalCount = await orderModal.countDocuments();

    orders = await orderModal
      .find(query)
      .sort({ _id: 1 })
      .limit(limit)
      .populate("user")
      .lean();
  }

  return (
    <>
      {id ? (
        <div className="transparentCard">
          <div className="row justify-content-between align-items-start">
            <div className="col-lg-6">
              <span className="edit">Address</span>
              <br />
              <div>
                <span className="fw-bold">City:</span>
                <span className="mx-1"> {order.shippingAddress.city}</span>
              </div>
              <span className="mx-1">{order.shippingAddress.address}</span>
              <div>
                <span className="fw-bold">
                  PostalCode:
                </span>
                <span className="mx-1">
                  {order.shippingAddress.postalCode}
                </span>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="edit">Items</span>
              <br />
              {order.items.map((p, index) => (
                <div key={index}>
                  <div>
                    <span className="fw-bold"> Title :</span>
                    <span className="mx-1"> {p.title}</span>
                  </div>
                  <div>
                    <span className="fw-bold"> Price :</span>
                    <span className="mx-1"> ${p.price}</span>
                  </div>
                  <div>
                    <span className="fw-bold"> Qty :</span>
                    <span className="mx-1"> {p.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Status</th>
                <th>Payment</th>
                <th>IsPaid</th>
                <th>Date</th>
                <th>Total</th>
                <th>
                  <FaRegEdit />
                </th>
              </tr>
            </thead>
            <OrdersList data={JSON.parse(JSON.stringify(orders))} />
          </Table>
          <Pagination
            href="orders?"
            currentPage={page}
            pageCount={Math.ceil(totalCount / limit)}
            limit={limit}
          />
        </>
      )}
    </>
  );
}
