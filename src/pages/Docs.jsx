import React from "react";
import { IoIosHome } from "react-icons/io";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div className="px-4 py-8 w-full mx-auto space-y-6 text-gray-700">
      <Link to={'/'} className=''>
        <IoIosHome size={32} color="#1e293b" />
      </Link>
      <section>
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p>
          This is a documentation example. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta, esse nisi iusto voluptas reprehenderit cupiditate ut at, velit officia eveniet veniam sequi excepturi omnis delectus repellat reiciendis repellendus harum?
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta, esse nisi iusto voluptas reprehenderit cupiditate ut at, velit officia eveniet veniam sequi excepturi omnis delectus repellat reiciendis repellendus harum?
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Services</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta, esse nisi iusto voluptas reprehenderit cupiditate ut at, velit officia eveniet veniam sequi excepturi omnis delectus repellat reiciendis repellendus harum?
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Policy</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta, esse nisi iusto voluptas reprehenderit cupiditate ut at, velit officia eveniet veniam sequi excepturi omnis delectus repellat reiciendis repellendus harum?
        </p>
      </section>
    </div>
  );
};

export default Docs;
