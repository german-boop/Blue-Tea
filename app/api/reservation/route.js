import connectToDB from "@/db/db";
import reservationModal from "@/model/reservation";
import { reservationValidationSchema } from "@/validators/reservation";
import { authAdmin } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
     try {
          await connectToDB()
          const admin = await authAdmin()
          if (!admin) throw ("This Api Protected")
  
          const { searchParams } = new URL(req.url);
          const useCursor = searchParams.has("cursor");
  
          const result = await paginate(
              reservationModal,   // Model
              searchParams,   // searchParams
              {},             // filter
              null,           // populate
              useCursor       // cursor | pagination
          );
          return NextResponse.json(result, { status: 200 });
      }
  
      catch (err) {
          return NextResponse.json({ message: "UNKNOWN ERROR" }, { status: 500 });
      }
}

export async function POST(req) {
    try {
        connectToDB()
        const body = await req.json()
        const parsed = reservationValidationSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { errors: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const isResevationExist = await reservationModal.findOne({ $or: [{ name: body.name }, { phone: body.phone }] })
        if (isResevationExist) {
            return NextResponse.json(
                { message: "Reservation already exists" },
                { status: 409 }
            )
        }

        await reservationModal.create(parsed.data)
        return NextResponse.json({ message: "reservation created successfully" }, { status: 200, })
    }
    catch (err) {
        return NextResponse.json({ message: "Unknown Error" }, { status: 500 })
    }
}
