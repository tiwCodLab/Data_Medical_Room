import Medication from "../model/MedicationsDB.js";
import Dispensing from "../model/DispensingDB.js";

async function aggregateMedication(medical) {
  let group = {};
  let aggProd = [];

  medical.forEach((e) => {
    let key = e.id;
    if (group.hasOwnProperty(key)) {
      group[key].count += e.qty;
    } else {
      group[key] = { count: e.qty };
    }
  });

  let arrIDs = Object.keys(group);

  try {
    const groupmedical = await Medication.find(
      { medication_id: { $in: arrIDs } },
      { medication_id: true, _id: true, price: true }
    );

    if (groupmedical && groupmedical.length > 0) {
      let total = 0;
      groupmedical.forEach((e) => {
        let subtotal = group[e.medication_id].count * e.price;
        aggProd.push({
          medication_id: e._id, // Change to match your schema
          unitPrice: e.price,
          qty: group[e.medication_id].count,
          subtotal: subtotal,
        });
        total += subtotal;
      });

      console.log("-----", aggProd);
      return { medications: aggProd, total };
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error aggregating medication:", error);
    return {};
  }
}

export let create = async (req, res) => {
  var cart = req.body;
  var medication = cart.checkoutMedication;
  var { medications, total } = await aggregateMedication(medication);
  const now = Date.now();

  try {
    if (medications && medications?.length > 0) {
      let anOrder = new Dispensing({
        orderNo: now.toString(),
        ddd: req.body.ddd,
        dispensingItems: medications,
        total: total,
      });

      const result = await anOrder.save();
      console.log("save ", result);

      if (result) {
        const addedOrder = await Dispensing.findById(result._id)
          .populate({
            path: "dispensingItems.medicationRef",
            model: "Medication",
          }) // Update path accordingly
          .exec();

        if (addedOrder) {
          console.log(JSON.stringify(addedOrder, null, "\t"));
          res.json(addedOrder);
        }
      } else {
        return res.status(400).send({
          errors: "Cannot process the order",
        });
      }
    }
  } catch (err) {
    return res.status(400).send({
      errors: "Cannot process the order" + err.name,
    });
  }
};

// Get function
export let get = async (req, res) => {
  try {
    const dispensings = await Dispensing.find();
    res.status(200).json(dispensings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get by ID function
export let getById = async (req, res) => {
  const { id } = req.params;
  try {
    const dispensing = await Dispensing.findById(id);
    if (!dispensing) {
      return res.status(404).json({ message: "Dispensing not found" });
    }
    res.status(200).json(dispensing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Put function
export let put = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedDispensing = await Dispensing.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.status(200).json(updatedDispensing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete function
export let del = async (req, res) => {
  const { id } = req.params;
  try {
    await Dispensing.findByIdAndRemove(id);
    res.status(200).json({ message: "Dispensing deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
