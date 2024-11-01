<?php

namespace App\Http\Controllers\Api;

use Error;
use EasyPost\EasyPostClient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\OrderRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Shippingaddress;
use App\Models\Article;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request): JsonResponse
    {

        $output = new \Symfony\Component\Console\Output\ConsoleOutput();
        $output->writeln($request->address);
        $output->writeln("OK");

        if ($request->remember_me && auth('sanctum')->check()) {
            $output->writeln("userid");
            $output->writeln($request->user()->id);
            $user = $request->user();
            // $shippingAdress = Shippingaddress::create([
            //     'street1' => $request->address['street1'],
            //     'street2' => $request->address['street2'],
            //     'city' => $request->address['city'],
            //     'state' => $request->address['state'],
            //     'zip' => $request->address['zip'],
            //     'country' => $request->address['country']
            // ]);
            $shippingAdress = new Shippingaddress();
            $shippingAdress->fill($request->address);
            $shippingAdress->user_id = $user->id;
            $shippingAdress->save();

            $output->writeln($shippingAdress);
        }
        $client = new EasyPostClient("EZTKed6857d9a8a145ce98fa18f91b8b0e40v0BvDJ3IeTHeKTr9zFCjNw");

        $maxlength = 0;
        $maxwidth = 0;
        $totalheight = 0;
        $maxweight = 0;

        $cart = $request->cart;

        foreach ($cart as $item) {
            $article = Article::find($item['article']['id']);
            $maxlength = $maxlength < $article->length ? $article->length : $maxlength;
            $maxwidth = $maxwidth < $article->width ? $article->width : $maxwidth;
            $totalheight += $article->height;
            $maxweight = $maxweight < $article->weight ? $article->weight : $maxweight;
        }


        $shipment = $client->shipment->create([
            "from_address" => [
                "company" => "EasyPost",
                "street1" => "118 2nd Street",
                "street2" => "4th Floor",
                "city" => "San Francisco",
                "state" => "CA",
                "zip" => "94105",
                "phone" => "415-456-7890",
            ],
            "to_address" => $request->address,
            "parcel" => [
                "length" => 20.2,
                "width" => 10.9,
                "height" => 5,
                "weight" => 65.9,
            ],
        ]);
        // $boughtShipment = $client->shipment->buy($shipment->id, $shipment->lowestRate());

        $output = new \Symfony\Component\Console\Output\ConsoleOutput();

        //  $output->writeln($shipment->rates);
        $rates = $shipment->rates;
        $responseData = [];

        foreach ($rates as $rate) {
            $responseData[] = [
                "id" => $rate->id,
                "rate" => $rate->rate,
                "carrier" => $rate->carrier,
                "service" => $rate->service,
                "delivery_days" => $rate->delivery_days,
                // Include other relevant rate properties here
            ];
        }
        Log::info($rates);
        $output->writeln($shipment->rates[0]->rate);
        return response()->json([
            "rates" => $responseData,
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
